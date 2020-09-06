export default function selectionSortAnimator(array){
    const animations = []
    if(array.length <= 1) return array;
    selectionSort(array, animations);
    return animations
}

function selectionSort(array,animations){

    for(let i = 0; i< array.length; i++){
        let k = i
        let temp = array[i]
        animations.push([k,k,3])
        for (let j = i+1 ; j< array.length; j++ ){
            if(array[j] < array[k]){
                animations.push([k,k,4])
                k = j;
                animations.push([k,k,3])
            }
        }
        animations.push([k,k,4])
        array[i] = array[k]
        animations.push([i,k,2])
        array[k] = temp
        animations.push([i,k,4])
    }
    console.log(array);
    console.log(animations);
    return animations
}