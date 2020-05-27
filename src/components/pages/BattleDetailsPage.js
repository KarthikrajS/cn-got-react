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
import death from '../icons/death.png'

class BattleDetailsPage extends React.Component{

    state={
        battle:[],
        isLoading:false,
        imageURL:null,

    }
    componentDidMount() {
        if(localStorage.getItem('battlePage'))
            this.props.battleDetails(localStorage.getItem('battlePage')).then(battle=>{
                this.setState({battle:battle[0]})
            })
        this.updateState()

    }

    componentWillMount() {


            this.props.battleDetails(this.props.match.params.token).then(battle=>{
                this.setState({battle:battle[0]})
                localStorage.setItem('battlePage',battle[0])
            })
        this.updateState()
    }
    deathCapture(key,vaue){
        return(
            <Grid.Column>
            <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                <div><img src={this.aquireHouse("death")} style={{"weight":"50px","height":"50px"}} ></img></div>
            <div>{key}:{vaue}</div>
        </Card>
        </Grid.Column>)
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
        if(housename === "defend")
            return defend
        if(housename === "attack")
            return attack
        if(housename ==="death")
            return death

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
        console.log(housename)
        var name =housename.split(" ").join("").split("'").join("").toLocaleLowerCase()
        var data = this.aquireHouse(name)
        var houseCard = []
        {console.log(name)}
        houseCard.push(
            <Grid.Column>
                <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                    <Card.Body>
                        <div className="houseImg" ><img src={data} style={{"weight":"50px","height":"50px"}} ></img></div>
                        <hr/>
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
                            {<div className="cmdName">Commander : {cmds}</div>}
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

            <TopNavigation updateParent={this.updateState.bind(this)} updateSecondaryMenu/>

            <Container style={{"marginTop":"1%"}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column >
                            {battle.length !==0 &&
                            <Card  bg="dark" text="white"  style={{"width": "100%","fontSize":"15px"}}
                                   className="text-center p-3" >
                                {battle.name}
                            </Card>
                            }
                            {battle.length !==0 &&
                            <Card  bg="dark" text="white"  style={{"width": "100%","fontSize":"15px"}}
                                   className="text-center p-3" >
                                {battle.location+", "+ battle.region}</Card>
                            }
                        </Grid.Column>



                    </Grid.Row>
                </Grid>
            </Container>
            <br/>
            <Container>
                <Grid.Row style={{"marginRight":"2.5%"}}>
                    {battle.length!==0 && battle.attacker_commander!=="" && this.buildCommanderCards(battle.attacker_commander) }
                    <hr/>
                    {battle.length!==0 && battle.defender_commander!=="" && this.buildCommanderCards(battle.defender_commander) }
                </Grid.Row>
            </Container>
            {!isBattle && battle.length !==0 &&
            <Container style={{"marginTop":"1%"}} >
                <Grid.Row style={{"marginRight":"2.5%"}} >
                    {
                        battle.length !==0 && this.buildKingCards(battle.attacker_king,battle.attacker_outcome=== 'win' ?'green':'red')}
                    <hr/>
                    { battle.length !==0 && this.buildKingCards(battle.defender_king,battle.attacker_outcome!== 'win' ?'green':'red')}
                </Grid.Row>
            </Container>
            }

            <br/>
            <Container >
                {console.log(battle)}
                <Grid.Row style={{"marginRight":"1.5%"}}>
                    {battle.length !==0 && battle.attacker_1 !=="" &&this.buildHouseCard(battle.attacker_1,battle.attacker_1)}
                    {battle.length !==0 && battle.attacker_2 !=="" && this.buildHouseCard(battle.attacker_2,battle.attacker_2)}
                    {battle.length !==0 && battle.attacker_3 !=="" && this.buildHouseCard(battle.attacker_3,battle.attacker_3)}
                    {battle.length !==0 && battle.attacker_4 !=="" && this.buildHouseCard(battle.attacker_4,battle.attacker_4)}

                    <hr/>

                    {battle.length !==0 && battle.defender_1 !=="" && this.buildHouseCard(battle.defender_1,battle.defender_1)}
                    {battle.length !==0 && battle.defender_2 !=="" && this.buildHouseCard(battle.defender_2,battle.defender_2)}
                    {battle.length !==0 && battle.defender_3 !=="" && this.buildHouseCard(battle.defender_3,battle.defender_3)}
                    {battle.length !==0 && battle.defender_4 !=="" && this.buildHouseCard(battle.defender_4,battle.defender_4)}
                </Grid.Row>
            </Container>
            <br/>
            <Container>
                <Grid.Row style={{"marginRight":"1.5%"}}>
                    {battle.length !==0 &&this.buildHouseCard("attack",battle.attacker_size)}
                    {battle.length !==0 &&this.deathCapture("Capture",(battle.major_capture?"YES":"NO"))}
                    <hr/>
                    {battle.length !==0 &&this.deathCapture("Death",(battle.major_death ?"YES":"NO"))}
                    {battle.length !==0 &&this.buildHouseCard("defend",battle.defender_size)}
                </Grid.Row>
            </Container>
        </div>)
    }
}

BattleDetailsPage.prototypes ={
    battleDetails: PropTypes.func.isRequired,
    isBattle : PropTypes.bool.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token:PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

function mapStateToProps(state) {
    return {
        isBattle: !!state.battle
    }
}
export default connect(mapStateToProps,{battleDetails})(BattleDetailsPage)
