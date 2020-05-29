import axios from 'axios';

export default{
    battleData:{
        battleDataList:()=>
            axios.post("/api/battleData/list").then(res => res.data),
        battleKingsList:()=>
            axios.post("/api/battleData/kings").then(res => res.data),
        battleTypesList:()=>
            axios.post("/api/battleData/types").then(res => res.data),
        battleDataCount:data=>
            axios.post("/api/battleData/count",{data}).then(res => res.data),
        battleBasedOnLocation:location=>
            axios.post("/api/battleData/battleBasedOnLocation",{location}).then(res => res.data),
        battleBasedOnTypes: type=>
            axios.post("/api/battleData/battleBasedOnTypes",{type}).then(res => res.data),
        battleBasedOnKings: king=>
            axios.post("/api/battleData/battleBasedOnKings",{king}).then(res => res.data),
        battleDetails: battleName=>
            axios.post("/api/battleData/battleDetails",{battleName}).then(res => res.data),
        search:data=>
            axios.post("/api/battleData/search",{data}).then(res=>res.data)
    }
}