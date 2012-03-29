class Config {
    def config

    public Config() {
        config = new File('config.json').text
        println config
    }

}