interface IAnimal {
  comer(): void;
  dormir(): void;
  reproducir(): void;
}

interface ISimio {
  trepar(): void;
}

class Elefante implements IAnimal {
  comer(): void {
    console.log("elefante comer");
  }
  dormir(): void {
    console.log("elefante dormir");
  }
  reproducir(): void {
    console.log("elefante reproducir");
  }
}

class Jirafa implements IAnimal {
  comer(): void {
    console.log("jirafa comer");
  }
  dormir(): void {
    console.log("jirafa dormir");
  }
  reproducir(): void {
    console.log("jirafa reproducir");
  }
}

class Simio implements IAnimal, ISimio {
  comer(): void {
    console.log("simio comer");
  }
  dormir(): void {
    console.log("simio dormir");
  }
  reproducir(): void {
    console.log("simio reproducir");
  }
  trepar() {
    console.log("simio trepar");
  }
}
