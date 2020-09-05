export default function bubbleSortAnimator(array){
    const animations = []
    if(array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations
}

// 9,3,4,5,67,3,1,1,3,5,8,9,67,4,2,1,1
function bubbleSortHelper(array, animations){
    let i = 0;
    let j = 0;
    for(i = 0; i< array.length; i++){
        for(j = 0; j< array.length -i -1; j++){
            if(array[j] > array[j+1]){
                animations.push([j,j+1,2]) //Red
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
            animations.push([j,j+1,3]) //Blue    
        }
        animations.push([j,j,4]) //Green    
    }
    console.log(array);
    return animations
}