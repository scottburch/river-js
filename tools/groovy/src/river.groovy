import groovyx.net.http.*
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*

this.config = new Config()
def cmd = this.args[0]


this['list-plugins'] = {
    def json = getPluginConfig();
    json.plugins.each {
        println "${it.name} ${it.ver} - ${it.author}"
    }
}

this['install-plugin'] = {

}

if(cmd) {
    this[cmd]()
} else {
    println "Please enter a command"
}

private getPluginConfig() {
    def http = new HTTPBuilder(config.config.moduleListHost);
    http.request( GET, JSON) {
        uri.path = "/${config.config.moduleListPath}"
        response.success = {resp, json ->
            return json
        }
    }
}

