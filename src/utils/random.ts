export function getRandomIndex(max:number) {
  return Math.floor(Math.random() * max);
}

export function getRandomIndices(num :number, max: number){
    const indices :number[]= [];

    while(indices.length < num) {
    const a =  getRandomIndex(max);
    if(indices.includes(a)) {
        continue;
    } else {
        indices.push(a);
    }
    }

    return indices;
}