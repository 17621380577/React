module.exports = Object.assign({
    path: "/SettingCenter",
    breadcrumbName: "配置中心",
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require("./routes/AutoCollection"),
                require("./routes/ManuallyAdd")

            ])
        }, 'web/OSA/chunk/SettingCenter')
    }
}, webOSARouteEnter);