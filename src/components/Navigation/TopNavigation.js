import React from 'react';
import PropTypes from 'prop-types';
import{connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
import {Navbar, NavItem, Button, Badge} from "react-bootstrap";
import {Link} from 'react-router-dom';
import search from '../icons/search.png'
import expandarrow from '../icons/expandarrow.png';
import {useHistory} from 'react-router-dom';

import {battleDataList,battleDataCount,battleKingsList,battleTypesList} from '../actions/battleData'


class TopNavigation extends React.Component{

    constructor(props) {
        super(props);
    }

    state={
        location:null,
        locations:[],
        kings:[],
        king:null,
        battleTypes:[],
        battleType:null,
        battleCount:0,
        type:null,
        secondaryMenu : false,
        navigator : true,
        badge:''
    }
    clearSelection(){
        this.setState({location:null,type:null,king:null})
    }
    loadLocation(){
        this.props.battleDataList().then(locations =>{
            this.setState({locations: locations})
        })
    }
    loadKing(){
        this.props.battleKingsList().then(kings=>{
            this.setState({kings:kings})
        })
    }
    loadType(){
        this.props.battleTypesList().then(types=>{
            this.setState({battleTypes:types})
        })}
    componentWillMount(){

        var {location} = this.state
        this.loadLocation()
        localStorage.setItem('king',JSON.stringify(null));
        localStorage.setItem('type',JSON.stringify(null))
        this.props.battleDataCount({type:null,value:null}).then(count=>{
            this.setState({battleCount: count,badge:''})
        })
        this.loadKing()
        localStorage.setItem('king',JSON.stringify(null));
        this.loadType()
        localStorage.setItem('type',JSON.stringify(null));
        localStorage.setItem('searchBattle',JSON.stringify(null))
        this.removeParam()
    }
    removeParam(){
        let url =(window.location)
        let params = new URLSearchParams(url.search.slice(1))
        params.delete('king')
        params.delete('location')
        params.delete('type')
        window.history.replaceState({},'','/'+params)
    }

    handleChange = (e,{value}) =>{
        e.preventDefault()
        this.props.updateParent()
        this.removeParam()
        this.props.battleDataCount({type:"location",value:value}).then(count=>{
            this.setState({battleCount: count,location:value,badge:value})
        })
        localStorage.setItem('location',JSON.stringify(value));
        localStorage.setItem('searchBattle',JSON.stringify(null))
        localStorage.removeItem('king')
        localStorage.removeItem('type')
        this.props.updateParent()
    }
    handleKingChange=(e,{value})=>{
        e.preventDefault()
        this.props.updateParent()
        this.removeParam()
        this.props.battleDataCount({type:"king",value:value}).then(count=>{

            this.setState({battleCount: count,king:value,badge:value})
        })
        localStorage.setItem('king',JSON.stringify(value));
        localStorage.setItem('searchBattle',JSON.stringify(null))
        localStorage.removeItem('type')
        localStorage.removeItem('location')
        this.props.updateParent()
    }

    handleTypeChange=(e,{value})=>{
        e.preventDefault()
        this.props.updateParent()
        this.removeParam()
        this.props.battleDataCount({type:"type",value:value}).then(count=>{
            this.setState({battleCount: count,type:value,badge:value})
        })
        localStorage.removeItem('king')
        localStorage.removeItem('location')
        localStorage.setItem('type',JSON.stringify(value));
        this.props.updateParent()
    }
    battleSearch(king,location,type) {

        if(king!==null){
            if( type !== null && location !==null){
                return "/search/king="+king+"&type="+type+"&location="+location
            }
        }
    }
    updateParent(){
        this.setState({isLoading :!this.state.isLoading})
    }
    searchNavigator(){
        this.setState({navigator: !this.state.navigator})
    }
    searchNavigation(){
        this.setState({secondaryMenu: !this.state.secondaryMenu})
    }

    render () {

        const {locations,battleCount,location,secondaryMenu,kings,battleTypes,king,type,badge,navigator} = this.state;
        const {isLocation,isKings,isTypes} = this.props;
        return(
            <div>
                <Navbar bg="dark" className="align-content-md-end" style={{"font-family":"Game of Thrones"}}>
                    {/*<a href="/">*/}
                    <NavItem style={{"color":"#fff"}} as={Link} to="/" className="dropdown">

                        Game Of Thrones
                    </NavItem>
                    {/*</a>*/}

                    <hr/>
                    {(!new URLSearchParams(window.location.search).has('battleName')) &&
                    <NavItem>
                        <Button variant="danger" style={{"font-size": "10px"}}>
                            <span>{(badge === '') ? "All Battles" : badge}</span>
                            <span>
                        <Badge variant="light" style={{"margin-left": "5px", "font-size": "12px"}}>{battleCount}</Badge>
                        </span>
                        </Button>
                        { localStorage.getItem('Navigation') === "Yes" && <Button onClick={() => this.searchNavigation()} variant="dark"
                                style={{"font-size": "10px", "margin-left": "5px"}}>
                            <span>More</span>
                            <span>
                        <Badge variant="light" style={{"margin-left": "5px", "font-size": "12px"}}>
                            <img style={{"width": "12px", "height": "12px"}} src={expandarrow}></img>
                        </Badge>
                        </span>
                        </Button>}
                    </NavItem>
                    }
                </Navbar>
                {(! new URLSearchParams(window.location.search).has('battleName') ) && (localStorage.getItem('bp')!==true) && secondaryMenu && <div className="secondaryNavBar">
                    <Navbar bg="dark" className="align-content-md-end" style={{"font-family": "Game of Thrones"}}>

                        <NavItem className="dropdown">

                            { !isKings && <Dropdown
                                placeholder='Select Attacker King'
                                fluid
                                selection
                                search
                                options={kings}
                                value={king}
                                onChange={this.handleKingChange}
                            />}
                        </NavItem>
                            <hr/>
                        <NavItem className="dropdown" >
                            { !isLocation &&
                            <Dropdown xs={12} lg={3}
                                   placeholder='Select Battle Field'
                                   fluid
                                   selection
                                   search
                                   value={location}
                                   options={locations}
                                   onChange={this.handleChange}
                            />}
                        </NavItem>

                        <hr/>
                        <NavItem className="dropdown">

                            { !isTypes && <Dropdown
                                placeholder='Select Battle Type'
                                fluid
                                selection
                                search
                                options={battleTypes}
                                value={type}
                                onChange={this.handleTypeChange}
                            />}
                        </NavItem>
                        {king!==null && location!==null && type!==null && <NavItem>
                            <Button  as={Link} to={(this.battleSearch(king,location,type))} variant="danger"
                                    style={{"font-size": "10px", "margin-left": "5px"}}>
                                <span>Search</span>
                                <span>
                        <Badge variant="light" style={{"margin-left": "5px", "font-size": "12px"}}>
                            <img style={{"width": "12px", "height": "12px"}} src={search}></img>
                        </Badge>
                        </span>
                            </Button>
                        </NavItem>}
                    </Navbar>
                </div>
                }
            </div>
        )
    }
};


TopNavigation.propTypes={
    isLocation: PropTypes.bool.isRequired,
    battleDataList:PropTypes.func.isRequired,
    battleKingsList:PropTypes.func.isRequired,
    battleDataCount: PropTypes.func.isRequired,
    battleTypesList: PropTypes.func.isRequired,
    isKings: PropTypes.bool.isRequired,
    isTypes: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isLocation: !!state.locations,
        isKings : !!state.kings,
        isTypes: !!state.battleTypes,
        history: PropTypes.shape({
        push: PropTypes.func.isRequired
        }).isRequired
        // userType:decode(localStorage.iotJWT).userType
    }
}


export default connect(mapStateToProps,{battleDataList,battleDataCount,battleKingsList,battleTypesList})(TopNavigation)