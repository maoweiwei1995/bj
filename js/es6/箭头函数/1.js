function Cat(name) {
    this.name = name;
}

Cat.prototype.sayCatName = () => {
    console.log(this === window); // => true
    return this.name;
};

const cat = new Cat('Mew');
cat.sayCatName(); // => undefined复制代码