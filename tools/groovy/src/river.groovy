def config = new Config()
def cmd = this.args[0]


this['list-plugins'] = {

    println 'list plugins'
}

if(cmd) {
    this[cmd]()
} else {
    println "Please enter a command"
}

