import axios from 'axios';

export default{
    battleData:{
        battleDataList:()=>
            axios.post("/battleData/list").then(res => res.data),
        battleKingsList:()=>
            axios.post("/battleData/kings").then(res => res.data),
        battleTypesList:()=>
            axios.post("/battleData/types").then(res => res.data),
        battleDataCount:data=>
            axios.post("/battleData/count",{data}).then(res => res.data),
        battleBasedOnLocation:location=>
            axios.post("/battleData/battleBasedOnLocation",{location}).then(res => res.data),
        battleBasedOnTypes: type=>
            axios.post("/battleData/battleBasedOnTypes",{type}).then(res => res.data),
        battleBasedOnKings: king=>
            axios.post("/battleData/battleBasedOnKings",{king}).then(res => res.data),
        battleDetails: battleName=>
            axios.post("/battleData/battleDetails",{battleName}).then(res => res.data),
        search:data=>
            axios.post("/battleData/search",{data}).then(res=>res.data)
    }
}
