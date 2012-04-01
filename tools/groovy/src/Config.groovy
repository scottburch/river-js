import groovy.json.JsonSlurper

class Config {
    def config

    public Config() {
//        config = new JsonSlurper().parseText(new File('conf/config.json').text)
        config = new JsonSlurper().parseText(configText);
        println config
    }


    def configText = """
    {
        "moduleListHost": "http://localhost",
        "moduleListPath": "~scott/plugins.json"
    }
    """
}
