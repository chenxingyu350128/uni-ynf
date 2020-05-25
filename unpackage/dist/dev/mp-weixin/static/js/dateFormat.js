export default function dateTimeFormat(x){
    if(x instanceof Date){
        let y = x.getFullYear()
        let m = pretty(x.getMonth()+1)
        let d = pretty(x.getDate())
        // let h = pretty(x.getHours())
        // let n = pretty(x.getMinutes())
        // let s = pretty(x.getSeconds())
        return `${y}-${m}-${d}`
    } 
    console.error('这不是一个date类型')
    
};
function pretty(x){
    return x<10?'0'+x:x
}
