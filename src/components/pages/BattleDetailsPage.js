import React from 'react';
import {battleDetails} from '../actions/battleData';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TopNavigation from "../Navigation/TopNavigation";
import {Card, Col, Container} from 'react-bootstrap';
import ExampleComponent from 'react-rounded-image';
import {Grid} from 'semantic-ui-react'
import stark from '../icons/stark.png'
import karstark from '../icons/karstark.png'
import baratheon from '../icons/baratheon.png'
import blackwood from '../icons/blackwood.png'
import bracken from '../icons/bracken.png'
import brotherhood from '../icons/brotherhood.PNG'
import darry from '../icons/darry.png'
import freefolk from '../icons/freefolk.png'
import frey from '../icons/frey.PNG'
import greyjoy from '../icons/greyjoy.png'
import lannister from '../icons/lannister.png'
import mallister from '../icons/mallister.png'
import nightswatch from '../icons/nightswatch.png'
import thennes from '../icons/thennes.png'
import tully from '../icons/tully.png'
import archers from '../icons/archers.png'
import joffery from '../icons/joffery.jpg'
import robbstark from '../icons/robbstark.png'
import balon from '../icons/balon.jpg'
import eurongreyjoy from '../icons/eurongreyjoy.jpg'
import renlybaratheon from '../icons/renlybaratheon.jpg'
import stannisbaratheon from '../icons/stannisbaratheon.png'
import tommenbaratheon from '../icons/tommenbaratheon.jpg'
import mancerayder from '../icons/mancerayder.png'
import attack from '../icons/attack.png'
import defend from '../icons/defend.png'

class BattleDetailsPage extends React.Component{

    state={
        battle:[],
        isLoading:false,
        imageURL:null,

    }
    componentWillMount() {
        const  params = new URLSearchParams(window.location.search)
        if(params.has('battleName'))
            this.props.battleDetails(params.get('battleName')).then(battle=>{
                this.setState({battle:battle})
            })
        this.updateState()
    }
    aquireHouse(housename){
        if (housename === "tully" )
            return tully
        if (housename === "thenns" )
            return thennes
        if (housename === "nightswatch" )
            return nightswatch
        if (housename === "mallister" )
            return mallister
        if (housename === "lannister" )
            return lannister
        if (housename === "greyjoy" )
            return greyjoy
        if (housename === "frey" )
            return frey
        if (housename === "freefolk" )
            return freefolk
        if (housename === "stark" )
            return stark
        if(housename === "giants")
            return archers
        if (housename === "karstark" )
            return karstark
        if (housename === "baratheon" )
            return baratheon
        if (housename === "blackwood" )
            return blackwood
        if (housename === "bracken" )
            return bracken
        if (housename === "brotherhoodwithoutbanners" )
            return brotherhood
        if (housename === "darry" )
            return darry

    }
    aquireImage(kingName){
        if (kingName === "joffrey")
            return joffery;
        if (kingName === "robbstark")
            return robbstark;
        if (kingName === "balon")
            return balon
        if (kingName === "eurongreyjoy")
            return eurongreyjoy
        if (kingName === "renlybaratheon")
            return renlybaratheon
        if(kingName === "tommenbaratheon")
            return tommenbaratheon
        if(kingName === "stannisbaratheon")
            return stannisbaratheon
        if(kingName === "mancerayder")
            return mancerayder
    }


    updateState(){
        this.setState({isLoading :!this.state.isLoading})
    }
    buildHouseCard(housename,text){
        var name =housename.split(" ").join("").split("'").join("").toLocaleLowerCase()
        var data = this.aquireHouse(name)
        var houseCard = []
        {console.log(name)}
        houseCard.push(
            <Grid.Column>
                <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                    <Card.Body>
                        <div className="houseImg" ><img src={data} style={{"weight":"50px","height":"50px"}} ></img></div>
                        <div className="number">{text!==null? text:''}</div>
                    </Card.Body>
                </Card>
            </Grid.Column>
        )
        return houseCard
    }

    buildCommanderCards(cmd){
        var cmdCard =[]
        var cmdColl =[]
        cmdColl.push(cmd.split("/"))
        cmdColl[0].forEach(cmds=>{
            cmdCard.push(
                <Grid.Column xs={3} md={3} style={{"marginLeft":"1%"}}>
                    <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                        <Card.Body>
                            {<div className="cmdName">{cmds}</div>}
                        </Card.Body>
                    </Card>
                </Grid.Column>
            )
        })
        return cmdCard
    }
    buildKingCards(kings,color){
        var kingCard =[]
        var kingColl =[]

        kingColl.push(kings.split("/"))
        kingColl[0].forEach(king=>{
            var data = this.aquireImage(king.split(" ").join("").toLocaleLowerCase().toString())
            kingCard.push(

                <Grid.Column xs={3} md={3} style={{"marginLeft":"1%"}}>
                    <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                        <Card.Body>
                            {<div className="kingImg"><ExampleComponent roundedColor={color} image={data} ></ExampleComponent></div>}
                        </Card.Body>
                    </Card>
                </Grid.Column>

            )
        })
        return kingCard
    }

    render(){
        const {battle} = this.state
        const {isBattle} = this.props
        return(<div style={{"font-family": "Game of Thrones"}}>

            <TopNavigation updateParent={this.updateState.bind(this)}/>

            <Container style={{"marginTop":"1%"}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column >
                            {battle.length !==0 &&
                            <Card  bg="dark" text="white"  style={{"width": "100%","fontSize":"15px"}}
                                   className="text-center p-3" >
                                {battle[0].name}
                            </Card>
                            }
                            {battle.length !==0 &&
                            <Card  bg="dark" text="white"  style={{"width": "100%","fontSize":"15px"}}
                                   className="text-center p-3" >
                                {battle[0].location+", "+ battle[0].region}</Card>
                            }
                        </Grid.Column>



                    </Grid.Row>
                </Grid>
            </Container>

            {!isBattle && battle.length !==0 &&
            <Container style={{"marginTop":"1%"}} >
                <Grid.Row style={{"marginRight":"1.5%"}} >
                    {
                        battle.length !==0 && this.buildKingCards(battle[0].attacker_king,battle[0].attacker_outcome=== 'win' ?'green':'red')}
                    <hr/>
                    { battle.length !==0 && this.buildKingCards(battle[0].defender_king,battle[0].attacker_outcome!== 'win' ?'green':'red')}
                </Grid.Row>
            </Container>
            }
            <br/>
            <Container>
                <Grid.Row style={{"marginRight":"1.5%"}}>
                    {battle.length!==0 && battle[0].attacker_commander!=="" && this.buildCommanderCards(battle[0].attacker_commander) }
                    <hr/>
                    {battle.length!==0 && battle[0].defender_commander!=="" && this.buildCommanderCards(battle[0].defender_commander) }
                </Grid.Row>
            </Container>
            <Container>
                {console.log(battle[0])}
                <Grid.Row style={{"marginRight":"1.5%"}}>
                    {battle.length !==0 && battle[0].attacker_1 !=="" &&this.buildHouseCard(battle[0].attacker_1,null)}
                    {battle.length !==0 && battle[0].attacker_2 !=="" && this.buildHouseCard(battle[0].attacker_2,null)}
                    {battle.length !==0 && battle[0].attacker_3 !=="" && this.buildHouseCard(battle[0].attacker_3,null)}
                    {battle.length !==0 && battle[0].attacker_4 !=="" && this.buildHouseCard(battle[0].attacker_4,null)}

                    <hr/>

                    {battle.length !==0 && battle[0].defender_1 !=="" && this.buildHouseCard(battle[0].defender_1,null)}
                    {battle.length !==0 && battle[0].defender_2 !=="" && this.buildHouseCard(battle[0].defender_2,null)}
                    {battle.length !==0 && battle[0].defender_3 !=="" && this.buildHouseCard(battle[0].defender_3,null)}
                    {battle.length !==0 && battle[0].defender_4 !=="" && this.buildHouseCard(battle[0].defender_4,null)}
                </Grid.Row>
                <Grid.Row style={{"marginRight":"1.5%"}}>
                    {battle.length !==0 &&this.buildHouseCard(attack,battle[0].attacker_size)}
                    <hr/>
                    {battle.length !==0 &&this.buildHouseCard(defend,battle[0].defender_size)}
                </Grid.Row>
            </Container>
        </div>)
    }
}

BattleDetailsPage.prototypes ={
    battleDetails: PropTypes.func.isRequired,
    isBattle : PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isBattle: !!state.battle
    }
}
export default connect(mapStateToProps,{battleDetails})(BattleDetailsPage)