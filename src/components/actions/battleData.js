import api from './api';

export const battleDataList = () =>() => api.battleData.battleDataList().then(data=>  data.results.locations )
export const battleKingsList =() => () => api.battleData.battleKingsList().then(data=>  data.results.kings )
export const battleTypesList =() => () => api.battleData.battleTypesList().then(data=> data.results.types)
export const battleDataCount = (data) =>() => api.battleData.battleDataCount(data).then(data=>  data.results.count )
export const battleBasedOnLocation =(location)=> () => api.battleData.battleBasedOnLocation(location).then(data=> data.results.battles)
export const battleBasedOnTypes =(type)=> () => api.battleData.battleBasedOnTypes(type).then(data=> data.results.battles)
export const battleBasedOnKings =(king) => () => api.battleData.battleBasedOnKings(king).then(data=>data.results.battles)
export const battleDetails=(battleName) =>()=>api.battleData.battleDetails(battleName).then(data=>data.results.battle)
export const search = (data) =>() => api.battleData.search(data).then(data=> data.results.battles)