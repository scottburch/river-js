import groovy.json.JsonSlurper

class Config {
    def config

    public Config() {
        config = new JsonSlurper().parseText(new File('conf/config.json').text)
        println config
    }



}