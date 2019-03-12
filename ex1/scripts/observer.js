class Observer {
    update(){
        throw 'Update precisa ser implementado'
    }
}

class Subject {
    constructor(){
        this.observers = []
    }

    attach(observer){
        if (observer instanceof Observer)
            this.observers.push(observer)
        else
            throw 'observer precisa ser do tipo Observer'
    }

    detach(observer){
        this.observers.splice(this.observers.indexOf(observer))
    }

    notify(obj){
        console.log('notificando')
        console.log(this.observers)
        this.observers.forEach(observer => observer.update(obj))
    }
}