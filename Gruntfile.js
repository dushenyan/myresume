module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 清理构建目录
    clean: {
      dist: ['dist'],
      css: ['assets/css'],
    },

    // LESS 编译
    less: {
      development: {
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: 'assets/css/theme.css.map',
        },
        files: {
          'assets/css/theme.css': 'assets/less/theme.less',
        },
      },
      production: {
        options: {
          compress: true,
          cleancss: true,
          sourceMap: false,
        },
        files: {
          'assets/css/theme.min.css': 'assets/less/theme.less',
        },
      },
    },

    // 文件监听
    watch: {
      styles: {
        files: ['assets/less/**/*.less'],
        tasks: ['less:development'],
        options: {
          nospawn: true,
          livereload: true,
        },
      },
      typescript: {
        files: ['src/**/*.ts'],
        tasks: ['exec:build-typescript'],
        options: {
          nospawn: true,
        },
      },
      resumeData: {
        // 监听共享数据与简历配置，任一变更都触发全部简历 JSON 重新生成
        files: ['src/data/**/*.ts', 'src/profiles/**/*.ts'],
        tasks: ['exec:build-resume'],
        options: {
          nospawn: true,
        },
      },
      resume: {
        files: ['resume/**/*'],
        tasks: ['exec:build-html'],
        options: {
          nospawn: true,
        },
      },
    },

    // 执行命令
    exec: {
      'build-typescript': {
        command: 'npx tsc --noEmit',
      },
      'build-html': {
        command: 'npx esno ./src/scripts/build-html.ts',
      },
      'build-pdf': {
        command: 'npx esno ./src/scripts/build-pdf.ts',
      },
      'serve': {
        command: 'npx esno ./src/scripts/serve.ts',
      },
      'lint': {
        command: 'npx eslint .',
      },
      'lint-fix': {
        command: 'npx eslint . --fix',
      },
      'build-resume': {
        command: 'npx esno ./src/scripts/generate.ts generate',
      },
    },

    // 并发任务
    concurrent: {
      serve: {
        tasks: ['watch:styles', 'watch:resumeData', 'exec:serve'],
        options: {
          logConcurrentOutput: true,
        },
      },
      build: {
        tasks: ['less:production', 'exec:build-typescript', 'exec:build-html'],
        options: {
          logConcurrentOutput: true,
        },
      },
    },

    // 压缩文件
    compress: {
      main: {
        options: {
          archive: 'dist/resume-<%= pkg.version %>.zip',
        },
        files: [
          { src: ['dist/**'], dest: '/' },
          { src: ['assets/css/theme.min.css'], dest: '/assets/css/' },
        ],
      },
    },
  })

  // 加载插件
  require('load-grunt-tasks')(grunt)

  // 自定义任务
  grunt.registerTask('default', ['less:development'])

  // 开发任务
  grunt.registerTask('dev', [
    'clean:css',
    'less:development',
    'exec:build-resume',
    'concurrent:serve',
  ])

  // 构建任务（exec:build-resume 先从数据源生成全部简历 JSON，再渲染，
  // 保证全新克隆或多 profile 场景下无需手动执行生成步骤）
  grunt.registerTask('build', [
    'clean:dist',
    'clean:css',
    'less:production',
    'exec:build-resume',
    'exec:build-typescript',
    'exec:build-pdf',
  ])

  // 快速构建（仅样式和HTML）
  grunt.registerTask('build:quick', [
    'clean:dist',
    'less:development',
    'exec:build-resume',
    'exec:build-html',
  ])

  // 仅HTML构建
  grunt.registerTask('build:html', [
    'clean:dist',
    'less:development',
    'exec:build-resume',
    'exec:build-html',
  ])

  // PDF构建任务
  grunt.registerTask('build:pdf', [
    'build:quick',
    'exec:build-pdf',
  ])

  // 发布构建
  grunt.registerTask('build:release', [
    'build',
    'compress',
  ])

  // 代码检查
  grunt.registerTask('lint', ['exec:lint'])
  grunt.registerTask('lint:fix', ['exec:lint-fix'])

  // 服务任务
  grunt.registerTask('serve', ['dev'])
}
