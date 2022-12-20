import './App.css';
import { useState , useEffect , useRef } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Grid, GridColumn, Container , Header , Divider, Segment} from 'semantic-ui-react'

const App = () => {
  const [initialized,setInitialized] = useState(false)
  const [activePlayers,setActivePlayers] = useState([])
  const [selectedPlayers , setSelectedPlayers] = useState({player_1 : false , player_2 : false , player_3 : false , player_4 : false})
  const [playerThrows,setPlayerThrows] = useState({})
  const stateRef = useRef();
  const modus = useRef();
  const pt = useRef()
  pt.current = playerThrows
  stateRef.current = selectedPlayers;
  modus.current = initialized

  const validPlayers = [
    "player_1" ,
    "player_2" ,
    "player_3" ,
    "player_4" ,
    "admin"
  ]

  const validButtons = [
    'main' , 
    'save' ,
    'blue' ,
    'orange' ,
    'green' ,
    'yellow'
  ]

  const colorOrder = {
    0 : 'blue' ,
    1 : 'orange' ,
    2 : 'green' ,
    3 : 'yellow'
  }

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }
 
  const keyListeners = {
    //ADMIN    
      "Enter" : { 
        action : "save" ,
        player : "admin"
      },
    //PLAYER 1
      "Digit1" : {
        action : "main" ,
        player : "player_1" 
      },
      "KeyQ" : { 
        action : "blue" , 
        player : "player_1" 
      },
      "KeyW" : { 
        action : "orange" , 
        player : "player_1" 
      },
      "KeyE" : { 
        action : "green" , 
        player : "player_1" 
    },
      "KeyR" : {
        action :  "yellow" , 
        player : "player_1" 
    },
    //PLAYER 2
      "Digit2" :  { 
        action : "main" ,
        player : "player_2" 
    },
      "KeyA" : { 
        action : "blue", 
        player : "player_2" 
    },
      "KeyS" : { 
        action : "orange" , 
        player : "player_2" 
    },
      "KeyD" : { 
        action : "green" , 
        player : "player_2" 
    },
      "KeyF" : { 
        action : "yellow" , 
        player : "player_2" 
    },
    //PLAYER 3
      "Digit9" : {
        action : "main" , 
        player : "player_3" 
    },
      "KeyU"  : { 
        action : "blue", 
        player : "player_3" 
    },
      "KeyI" : { 
        action : "orange", 
        player : "player_3" 
    },
      "KeyO"  : { 
        action : "green" , 
        player : "player_3" 
    },
      "KeyP"  : { 
        action : "yellow" , 
        player : "player_3" 
    },
    //PLAYER 4
      "Digit0" : { 
        action : "main" , 
        player : "player_4" 
    },
      "KeyH" : {
        action :  "blue", 
        player : "player_4" 
    },
      "KeyJ" : { 
        action : "orange" , 
        player : "player_4" 
    }, 
      "KeyK" : { 
        action : "green" , 
        player : "player_4" 
    },
      "KeyL" : { 
        action : "yellow" , 
        player : "player_4" 
    },
  }

  const saveSettings = (val) => {
    let players = Object.keys(val)
    if(players.length > 0 ){
      for(let i = 0 ; i < players.length ; i++) {
        if(val[players[i]]) {
          setActivePlayers((prevPlayers => ([...prevPlayers , players[i]])))
          let tob = {
            dice : [
                { num : 'D1' , val : 0 , locked : false },
                { num : 'D2' , val : 0 , locked : false },
                { num : 'D3' , val : 0 , locked : false },
                { num : 'D4' , val : 0 , locked : false },
            ] ,
            throwsLeft : 3 ,
            player : players[i] ,
            score : 0 ,
            total : 0
          }
          setPlayerThrows((prevObject => ({ ...prevObject , 
              [players[i]] : tob
            })
          ))
        }
      }
    setInitialized(true)
    }
  }

  const resetGame = (val) => {
    let players = Object.keys(val)
    players.map((pl) => {
        let tob = {
          dice : [
            { num : 'D1' , val : 0 , locked : false },
            { num : 'D2' , val : 0 , locked : false },
            { num : 'D3' , val : 0 , locked : false },
            { num : 'D4' , val : 0 , locked : false },
          ] ,
          throwsLeft : 3 ,
          player : pl ,
          score : 0 ,
          total : 0
        }
      return setPlayerThrows((prevObject => ({ ...prevObject , 
        [pl] : tob
        })))
    })
  }

  const diceThrow = () => {
    let min = 1 
    let max = 6
    let t = 0
    for(let i = 0 ; i < 55 ; i++) {
      t = Math.floor(Math.random() * (max) + min)
    }
    return t
  }

  const calculateScores = (playerData) => {
    let scores = []
    let values = []
    let counts = {}
    playerData.dice.map((d) => {
      counts[d.val] = (counts[d.val] || 0) + 1
      return values.push(d.val)
    })
    values.sort((a,b) => { return a - b })
    const eq = Object.values(counts)
    let maxEq = Math.max(...eq)
    switch (maxEq) {
      case 2:
        if(eq.length === 2) {
          scores.push(25)
        } else {
          scores.push(20)
        } 
        break;
      case 3 : 
        scores.push(30)
        break;
      case 4 : 
        scores.push(40)
        break;
      default:
        scores.push(1)
        break;
    }
    let sl = 1
    let sls = []
    for(let sc = 0 ; sc < values.length - 1 ; sc++) {
      let diff = values[sc+1] - values[sc]
      if(diff === 1) {
        sl++
      } else {
        sls.push(sl)
        sl = 1
      }
    }
    sls.push(sl)
    let lsq = Math.max(...sls)
    if(lsq === 3) {
      scores.push(35)
    } else if (lsq === 4) {
      scores.push(50)
    }
    return Math.max(...scores)
  }

const buzzerListener = (e) => {
  //e.preventDefault()
  let keys = Object.keys(keyListeners)
  let colors = Object.values(colorOrder)
  if(keys.includes(e.code) && validPlayers.includes(keyListeners[e.code]['player']) && validButtons.includes(keyListeners[e.code]['action'])) {
    let p = keyListeners[e.code]['player']
    let a = keyListeners[e.code]['action']
    if(!modus.current) {
      if(keyListeners[e.code]['action'] === 'main') {
        togglePlayer(keyListeners[e.code]['player'])
      }
      if(keyListeners[e.code]['action'] === 'save') {
        saveSettings(stateRef.current)
      }
    } else {
      if(keyListeners[e.code]['action'] === 'main') {
        let player = pt.current[p]
        if(player.throwsLeft > 0) {
          player.throwsLeft = (player.throwsLeft - 1)
          let tot = 0
          for(let di = 0 ; di < player.dice.length ; di++) {
            if(!player.dice[di].locked) {
              let dt = diceThrow()
              player.dice[di].val = dt 
            }
            if(player.throwsLeft === 0 ) {
              player.dice[di].locked = true
            }
            tot = tot + player.dice[di].val
          }
          player.score = calculateScores(player)
          player.total = tot + player.throwsLeft
        } else {
          if(player.total) player.total = player.total - 1
        }
        setPlayerThrows((prevObject => ({ ...prevObject , 
          [p] : player
        })))
      }

      if(colors.includes(a)) {
        let player = pt.current[p]
        let thisKey = getKeyByValue(colorOrder,a)
        if(player.dice[thisKey].val !== 0 && player.throwsLeft > 0) {
          player.dice[thisKey].locked = !player.dice[thisKey].locked
          setPlayerThrows((prevObject => ({ ...prevObject , 
            [p] : player
          })))
        }
      }

      if(keyListeners[e.code]['action'] === 'save') {
        resetGame(stateRef.current)
      }
    }
  }
}

const togglePlayer = (player) => {
  setSelectedPlayers((prevState => ({
    ...prevState,
    [player]: !prevState[player],
  })))
}

const buttonStyle = { width: 300, height: 300 }
const gameStyle = { width: 175, height: 175 }

useEffect(() => {
  document.addEventListener('keydown' , buzzerListener , true)
},[])

return (
    <Container fluid>
      <Header as='h1' textAlign='center' 
       style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: '1em',
      }}
      >
        Christmas Buzz
      </Header>
      <Divider />
      { !initialized &&
        <Grid stackable columns={2} relaxed padded style={{height : '90vh' }}>
          <GridColumn id="player_1" >
             <Segment circular color={selectedPlayers['player_1'] ? 'green' : 'red'} inverted style={buttonStyle}>
                <Header as='h1' style={{fontSize : '5em'}}>1</Header>
              </Segment>
          </GridColumn>
          <GridColumn id="player_2">
            <Segment circular color={selectedPlayers['player_2'] ? 'green' : 'red'} inverted style={buttonStyle}>
                <Header as='h1' style={{fontSize : '5em'}}>2</Header>
                </Segment>
          </GridColumn>
          <GridColumn id="player_3">
          <Segment circular color={selectedPlayers['player_3'] ? 'green' : 'red'} inverted style={buttonStyle}>
                <Header as='h1' style={{fontSize : '5em'}}>3</Header>
                </Segment>
          </GridColumn> 
          <GridColumn id="player_4">
            <Segment circular color={selectedPlayers['player_4'] ? 'green' : 'red'} inverted style={buttonStyle}>
                <Header as='h1' style={{fontSize : '5em'}}>4</Header>
                </Segment>
          </GridColumn>
        </Grid> 
      }
      { initialized && activePlayers.length > 0 &&    
          <Grid columns='7' padded relaxed textAlign='center' divided='vertically'>
            { activePlayers.map((pl) => {
              return <Grid.Row key={pl}>
                <Grid.Column textAlign='center'>
                  <Segment basic textAlign='center' circular style={gameStyle}>
                  <Header as='h2' style={{fontSize : '3em'}}>{pl.split('_')[1]}</Header></Segment>
                </Grid.Column>
                  <Grid.Column>
                  <Segment  circular massive textAlign='center' color='red' className={playerThrows[pl]['throwsLeft'] > 0 ? 'inverted' : ''} style={gameStyle}>
                          <Header as='h2' style={{fontSize : '3.5em'}}>{playerThrows[pl]['throwsLeft']}</Header>
                        </Segment>
                    
                  </Grid.Column>
                  {
                    (playerThrows[pl].dice).map((d,di) => {
                      return <Grid.Column>
                        <Segment circular massive color={colorOrder[di]} className={d.locked ? '' : 'inverted'} style={gameStyle}>
                          <Header as='h1' style={{fontSize : '4em'}}>
                            {d.val}
                          </Header>
                        </Segment>
                      </Grid.Column>
                    })
                  }
                  <Grid.Column>
                  <Segment basic circular massive textAlign='center' color='pink' inverted style={gameStyle}>
                          <Header as='h1'  style={{fontSize : '3.5em'}}>{playerThrows[pl].score}
                            <Header.Subheader style={{fontSize : '0.5em'}}>
                              {playerThrows[pl].total}
                            </Header.Subheader>
                          </Header>
                        </Segment>
                  
                  </Grid.Column>
                </Grid.Row>
            })  
           } 
           </Grid>
      }
    </Container>
  );
}

export default App;