class AnimalES6 {
    constructor(name) {
        this.name = name;
    }

    doSomething() {
        console.log("I'm a " + this.name);
    }
}

var lionES6 = new AnimalES6("Lion");
lionES6.doSomething();

export default AnimalES6
