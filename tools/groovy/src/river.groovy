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
    def pluginInfo = getPluginInfo(this.args[1])
    def file = new FileOutputStream('river-plugin-temp')
    def out = new BufferedOutputStream(file)
    out << new URL(pluginInfo.path).openStream()
    out.close()

    AntBuilder ant = new AntBuilder()
    ant.unzip (src:'river-plugin-temp', dest: pluginInfo.name)
    ant.delete (file:'river-plugin-temp')
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

private getPluginInfo(name) {
    def json = getPluginConfig()
    def pluginInfo = json.plugins.find {return it.name == name}
    return pluginInfo
}
