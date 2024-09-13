const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/cl029873/front/index.html'
        }
    },
    getProjectName(){
        return {
            projectName: "小学家校互联平台"
        } 
    }
}
export default config
