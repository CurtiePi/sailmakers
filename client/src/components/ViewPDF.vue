<template>
  <div class="pdf-document">
    <PDFPage
      v-for="page in pages"
      v-bind="{page, scale}"
      :key="pages.pageNumber"
    />
  </div>
</template>

<script>
// import pdfjs from 'pdfjs-dist/webpack'
import AuthenticationService from '@/services/AuthenticationService'
import range from 'lodash/range'
import PDFPage from '@/components/PDFPage'

export default {
  props: ['payload'],
  components: {
    PDFPage
  },
  data () {
    return {
      url: null,
      scale: 1.5,
      pages: [],
      pdf: undefined
    }
  },
  watch: {
    pdf (pdf) {
      this.pages = []

      const pageNums = range(1, (1 + pdf.numPages))
      console.log(pageNums)
      const promises = pageNums.map(number => pdf.getPage(number))

      Promise.all(promises)
        .then(pages => {
          this.pages = pages
        })
    }
  },
  methods: {
    getSource: async function () {
      this.url = AuthenticationService.pdfView('test.pdf')
      const pdfjs = await import('pdfjs-dist/build/pdf')
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')

      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
      pdfjs.getDocument(this.url).promise.then(pdf => {
        this.pdf = pdf
      })
    }
  },
  mounted () {
    this.getSource()
  }
}
</script>

<style scoped>

</style>
