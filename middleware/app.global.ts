export default defineNuxtRouteMiddleware((_to, _from) => {
  useHead({
    titleTemplate: (productCategory) => {
      return productCategory
        ? `${productCategory} - OutlinedArc217`
        : 'OutlinedArc217'
    },
  })
})
