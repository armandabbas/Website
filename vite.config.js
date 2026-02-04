import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: ('index.html'),
        project1: ('project-1.html'),
        project2: ('project-2.html'),
        project3: ('project-3.html'),
        project4: ('project-4.html'),
        project5: ('project-5.html'),
        project6: ('project-6.html'),
      },
    },
  },
  server: {
    host: true
  }
})
