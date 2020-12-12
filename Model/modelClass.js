export class WalletData {
    constructor(icon = null, title, id) {
        this.icon = icon,
        this.title = title,
        this.id = id
    }
}

export function RequestFund(id, value, desc, status, date) {
    return (
        [{key:"Fund Id", value:`${id}`},
        {key:"Fund Amount", value:`${value}`},
        {key:"Discription", value:`${desc}`},
        {key:"Status", value:`${status}`},
        {key:"Date", value:`${date}`},
       ]
    )
}