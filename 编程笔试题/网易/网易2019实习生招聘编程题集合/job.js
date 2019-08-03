function setJob(job, person) {
    let ans = []
    let lenj = job.length
    job.sort((a, b) => a[0] - b[0])
    for (let i = 1; i < lenj; i++) {
        job[i][1] = Math.max(job[i-1][1], job[i][1])
    }
    let jobMap = new Map()
    for (let i = 0; i < lenj; i++) {
        jobMap.set(job[i][0], job[i][1])
    }    
    let personMap = new Map()
    for (let j = 0, lenp = person.length; j < lenp; j++) {
        personMap.set(person[j], j)
    }
    person.sort((a, b) => a - b)
}

function search(arr, val) {

}