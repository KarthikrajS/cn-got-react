import{Location} from '../types';

export default function battleDataCollection(state={},action={}) {
    switch (action.type) {
        case Location:
            return action.battleData
        default:
            return state;
    }
}
