import React, {Component} from 'react' ;
import axios from "axios" ;
import * as NBAIcons from 'react-nba-logos' ;
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerName2: null,
      playerStats: {},
      playerStats2: {},
      playerNames: {},
      playerNames2: {},
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    console.log(this.state.playerName)
  }

  handleSubmit2 = (e) => {
    e.preventDefault();
    this.getPlayerId2()
    console.log(this.state.playerName2)
  }

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_") ;
    if(replace.length > 0) {
      this.setState({playerName: replace})
    }else {
      alert("Please type player's name")
    }
  }

  handleChange2 = (event) => {
    const replace = event.target.value.split(" ").join("_") ;
    if(replace.length > 0) {
      this.setState({playerName2: replace})
    }else {
      alert("Please type player's name")
    }
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet.")
      } else if (res.data.data.length > 1) {
        alert("Please specificy the name more.")
      }else {
      await this.getPlayerTeam(res.data.data[0].id)
      await this.getPlayerStats(res.data.data[0].id)
      await this.getFirstName(res.data.data[0].id)
      await this.getLastName(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerId2 = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName2}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet.")
      } else if (res.data.data.length > 1) {
        alert("Please specificy the name more.")
      }else {
      await this.getPlayerTeam2(res.data.data[0].id)
      await this.getPlayerStats2(res.data.data[0].id)
      await this.getFirstName2(res.data.data[0].id)
      await this.getLastName2(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  // getPlayerTeamID = () => {
  //   axios.get(`https://www.balldontlie.io/api/v1/players/${this.state.playerId}`)
  //   .then(async res => {
  //     // console.log(res.data.data)
  //     if(res.data.data[0] === undefined){
  //       alert("This player is either injured or hasn't played yet.")
  //     } else if (res.data.data.length > 1) {
  //       alert("Please specificy the name more.")
  //     }else {
  //     await this.getPlayerTeamID(res.data.data[0]["team"].id)

  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  getPlayerTeam = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerTeam: res.data["team"].abbreviation})
    }).catch(err => {
      console.log(err)
    })
  }
  // make api url a const
  getPlayerTeam2 = (playerId2) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId2}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerTeam2: res.data["team"].abbreviation})
    }).catch(err => {
      console.log(err)
    })
  }

  getFirstName = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerFirstName: res.data["first_name"]})
    }).catch(err => {
      console.log(err)
    })
  }

  getFirstName2 = (playerId2) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId2}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerFirstName2: res.data["first_name"]})
    }).catch(err => {
      console.log(err)
    })
  }

  getLastName = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerLastName: res.data["last_name"]})
    }).catch(err => {
      console.log(err)
    })
  }
  // add comment for aggregator, helpful for autodoc parser. header saying what it does, in and outs, 
  getLastName2 = (playerId2) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId2}`)
   .then(async res => {
      console.log(res.data)
      this.setState({ playerLastName2: res.data["last_name"]})
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`)
   .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats2 = (playerId2) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId2}`)
   .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats2: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  threePointContestCalc = (fg3_pct, fg3a) => {
    let make_chance = (fg3_pct * 86)
    let shots = 25
    let current_shot = 1
    let makes = 0
    // make 56.4 alltimethreepoint const
    for (current_shot; current_shot <= shots; current_shot++) {
      let miss_chance = Math.floor(Math.random() * (53.64 - fg3a)) + 1
      if (miss_chance < make_chance) {
        makes += 1
        miss_chance = Math.floor(Math.random() * (53.64 - fg3a) ) + 1
      }
    }
    // let percentage_fg3 = makes / shots 
    return makes
  }

  // Name: printMatrixRowProduct
  // Purpose: print product of given row
  // incoming: int data[][COL], int& numRows, int& numCols, int userRow
  // outgoing: int& numRows, int& numCols
  // return: none
  oneOnOne = (fg3_pct, fgm, fg3m, fga, fg3a) => {
    let fg2a = fga - fg3a
    let fg2m = fgm - fg3m
    let fg2_pct = fg2m / fg2a
    let current_shot = 1
    let shot2Ratio = fg2a / fga
    let shot3Ratio = fg3a / fga
    var shots = 85 * (shot3Ratio * .5)
    var score = 0
    let make3Chance = (fg3_pct * 100)
    let make2Chance = (fg2_pct * 100)


      for (current_shot; score < 21 && current_shot <= shots; current_shot++) {
          if ((Math.random() * shot2Ratio) >  (Math.random() * shot3Ratio)){
            let miss2chance = Math.floor(Math.random()) * (40) + 1
            if (miss2chance < make2Chance) {
              score += 2
              miss2chance = Math.floor(Math.random()) * (40) + 1
            }
          else {
            let miss3chance = Math.floor(Math.random()) * (70) + 1
            if (miss3chance < make3Chance) {
              score += 3
              miss3chance = Math.floor(Math.random()) * (70) + 1
          }
        }
        // if these mfs tie just be like if p1score == p2score then subtract a random number from one randomly Lol 
        } 
      }
      
      if (score ) 

      return score
    }




  // compareScores = (makes, score) => {
  //   compare those thisvars and stuff
  // }

  machine_learner = (points) => {
    let projected = points
    if (points >= 30) {
      projected += Math.round(Math.random() * 30) -10
    }
    else if (points >= 25) {
      projected += Math.round(Math.random() * 26) - 8
    }
    else if (points >= 20) {
      projected += Math.round(Math.random() * 20) - 7
    }
    else if (points >= 15) {
      projected += Math.round(Math.random() * 14) - 7
    }
    else if (points >= 10) {
      projected -= Math.round(Math.random() * 20) - 10
    }
    else if (points >= 5) {
      projected -= Math.round(Math.random() * 10) - 5
    }
    else if (points >= 0) {
      projected -= Math.round(Math.random() * 5)
    }


    return projected
  }
  
  getRightLogo = (teamName) => {
    let hail_mary = teamName
    switch(hail_mary) {
      case "ATL":
        return <NBAIcons.ATL/>
      case "BKN":
        return <NBAIcons.BKN/>
      case "BOS":
        return <NBAIcons.BOS/>
      case "CHA":
        return <NBAIcons.CHA/>
      case "CHI":
        return <NBAIcons.CHI/>
      case "CLE":
        return <NBAIcons.CLE/>
      case "DAL":
        return <NBAIcons.DAL/>
      case "DEN":
        return <NBAIcons.DEN/>
      case "DET":
        return <NBAIcons.DET/>
      case "GSW":
        return <NBAIcons.GSW/>
      case "HOU":
        return <NBAIcons.HOU/>
      case "IND":
        return <NBAIcons.IND/>
      case "LAC":
        return <NBAIcons.LAC/>
      case "LAL":
        return <NBAIcons.LAL/>
      case "MEM":
        return <NBAIcons.MEM/>
      case "MIA":
        return <NBAIcons.MIA/>
      case "MIL":
        return <NBAIcons.MIL/>
      case "MIN":
        return <NBAIcons.MIN/>
      case "NOP":
        return <NBAIcons.NOP/>
      case "NYK":
        return <NBAIcons.NYK/>
      case "OKC":
        return <NBAIcons.OKC/>
      case "ORL":
        return <NBAIcons.ORL/>
      case "PHI":
        return <NBAIcons.PHI/>
      case "PHX":
        return <NBAIcons.PHX/>
      case "POR":
        return <NBAIcons.POR/>
      case "SAC":
        return <NBAIcons.SAC/>
      case "SAS":
        return <NBAIcons.SAS/>
      case "TOR":
        return <NBAIcons.TOR/>
      case "UTA":
        return <NBAIcons.UTA/>
      case "WAS":
        return <NBAIcons.WAS/>
      default:
        return <img src="https://lifeinitaly.com/wp-content/uploads/2018/08/100px-NBALogo.svg_.png?itok=lGPylQNG" alt="NBA Logo" height="100" />
    }
  }
  //ident one more time
  render(){
  let thisLogo = this.getRightLogo(this.state.playerTeam)
  let thisLogo2 = this.getRightLogo(this.state.playerTeam2)

  let thisVar =  this.threePointContestCalc(this.state.playerStats["fg3_pct"], this.state.playerStats["fg3a"])
  let thisVar2 =  this.threePointContestCalc(this.state.playerStats2["fg3_pct"], this.state.playerStats2["fg3a"])

  let tester1 = this.oneOnOne(this.state.playerStats["fg3_pct"], this.state.playerStats["fgm"], this.state.playerStats["fg3m"], this.state.playerStats["fga"], this.state.playerStats["fg3a"])
  let tester2 = this.oneOnOne(this.state.playerStats2["fg3_pct"], this.state.playerStats2["fgm"], this.state.playerStats2["fg3m"], this.state.playerStats2["fga"], this.state.playerStats2["fg3a"])

  let comparator = (thisVar, thisVar2, tester1, tester2, playerLastName2, playerFirstName2, playerLastName, playerFirstName) => {
    let three_winner = ''
    let one_winner = ''
    let three_logo = ''
    let one_logo = ''
    // let photo = ''

    if (thisVar > thisVar2) {
     three_winner = playerFirstName + ' ' + playerLastName + ' won the 3 Point Contest'
     three_logo = thisLogo
    }
    else if (thisVar < thisVar2) {
     three_winner = playerFirstName2 + ' ' + playerLastName2 + ' won the 3 Point Contest'
     three_logo = thisLogo2
    }
    else {
      if (thisVar ===  0 || thisVar2 === 0) {
        three_winner = 'Enter Some Players for the 3 Point Contest'

      }
      else {
        three_winner = 'The 3 Point Contest was a tie!'

      }
      
    }

    if (tester1 > tester2) {
     one_winner = playerFirstName + ' ' + playerLastName + ' won the 1-on-1'
     one_logo = thisLogo
    }
    else if (tester1 < tester2) {
     one_winner = playerFirstName2 + ' ' + playerLastName2 + ' won the 1-on-1'
     one_logo = thisLogo2
    //  photo = <img src='https://www.basketball-reference.com/req/202106291/images/headshots/01.jpg' />
    }
    else {
      if (tester1 === tester2 && (tester1 >= 0 && tester2 >= 0)) {
        one_winner = 'The 1-on-1 was a tie'

      }
      else {
        one_winner = 'Enter Some Players for 1-on-1'
      }
    }

    return [one_winner, three_winner, one_logo, three_logo]
  }

  let myGuy = comparator(thisVar, thisVar2, tester1, tester2, this.state.playerLastName2, this.state.playerFirstName2, this.state.playerLastName, this.state.playerFirstName) 
  
  let next_game = this.machine_learner(Math.trunc(this.state.playerStats["pts"]))
  let next_game2 = this.machine_learner(Math.trunc(this.state.playerStats2["pts"]))

  let words = ''
  let words2 = ''
  let final_prediction = (projection, playerFirstName, playerLastName, projection2, playerFirstName2, playerLastName2) => {
    if (projection >= 0) {
      words = playerFirstName + ' ' + playerLastName + ' is projected to score ' + projection + ' points next game'
    }

    if (projection2 >= 0) {
      words2 = playerFirstName2 + ' ' + playerLastName2 + ' is projected to score ' + projection2 + ' points next game'
    }
    return [words, words2]
  }

  let final_say = final_prediction(next_game, this.state.playerFirstName, this.state.playerLastName, next_game2, this.state.playerFirstName2, this.state.playerLastName2)
  // let final_say2 = final_prediction(next_game2, this.state.playerFirstName2, this.state.playerLastName2)

  return (
    
    <body>
        <Card className = "Card1">
         <Card.Body>
         <div className="App" >
          <form id="form1" onSubmit={this.handleSubmit}>
            <label>
            <input 
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Enter Player 1 Name"
              />
            </label>
            <input type="submit" value="Search"/>
            <input type="reset" value="Reset" />
          </form>

          <br />
            Full Name: {this.state.playerFirstName} {this.state.playerLastName}
          <br />
            Team: {this.state.playerTeam}  
          <br />
            {thisLogo}
          <br />
            GP: {this.state.playerStats["games_played"]}
          <br />
            MPG: {this.state.playerStats["min"]}
          <br />
            PPG: {this.state.playerStats["pts"]}
            {/* "playerId": {photoId} */}
          <br />
            RPG: {this.state.playerStats["reb"]}
          <br />
            APG: {this.state.playerStats["ast"]}
          <br /> 
            SPG: {this.state.playerStats["stl"]}
          <br /> 
            BPG: {this.state.playerStats["blk"]}
          <br />
            FG%: {this.state.playerStats["fg_pct"]}
          <br />
            FGA: {this.state.playerStats["fga"]}
          <br />
            FGM: {this.state.playerStats["fgm"]}
          <br />
            3P%: {this.state.playerStats["fg3_pct"]}
          <br />
            3PA: {this.state.playerStats["fg3a"]}
          <br />
            3PM: {this.state.playerStats["fg3m"]}
          <br />
            FT%: {this.state.playerStats["ft_pct"]}
          <br />
            FTA: {this.state.playerStats["fta"]}
          <br />
            FTM: {this.state.playerStats["ftm"]}
          <br /><br />
            3 Point Contest Results: {thisVar}/25 or {((thisVar/25) * 100).toFixed(1)}%
          <br /> 
            1-on-1 Final Score: {tester1}
          </div>
          </Card.Body>
        </Card>

        <Card className = "Card2">
          <Card.Body>
          <div className="App" >
          <form id="form2" onSubmit={this.handleSubmit2}>
            <label>
            <input 
              type="text"
              value={this.state.value}
              onChange={this.handleChange2}
              placeholder="Enter Player 2 Name"
              />
            </label>
            <input type="submit" value="Search"/>
            <input type="reset" value="Reset" />
          </form>
          
          <br />
            Full Name: {this.state.playerFirstName2} {this.state.playerLastName2}
          <br />
            Team: {this.state.playerTeam2}  
          <br />
            {thisLogo2}
          <br />
            GP: {this.state.playerStats2["games_played"]}
          <br />
            MPG: {this.state.playerStats2["min"]}
          <br />
            PPG: {this.state.playerStats2["pts"]}
            {/* "playerId": {photoId} */}
          <br />
            RPG: {this.state.playerStats2["reb"]}
          <br />
            APG: {this.state.playerStats2["ast"]}
          <br /> 
            SPG: {this.state.playerStats2["stl"]}
          <br /> 
            BPG: {this.state.playerStats2["blk"]}
          <br />
            FG%: {this.state.playerStats2["fg_pct"]}
          <br />
            FGA: {this.state.playerStats2["fga"]}
          <br />
            FGM: {this.state.playerStats2["fgm"]}
          <br />
            3P%: {this.state.playerStats2["fg3_pct"]}
          <br />
            3PA: {this.state.playerStats2["fg3a"]}
          <br />
            3PM: {this.state.playerStats2["fg3m"]}
          <br />
            FT%: {this.state.playerStats2["ft_pct"]}
          <br />
            FTA: {this.state.playerStats2["fta"]}
          <br />
            FTM: {this.state.playerStats2["ftm"]}
          <br /><br />
            3 Point Contest Results: {thisVar2}/25 or {((thisVar2/25) * 100).toFixed(1)}%
          <br /> 
            1-on-1 Final Score: {tester2}
          </div>
          </Card.Body>
        </Card>

        <Card className="compareCard">
          <Card.Body>
            <br /> 
            <h4> {myGuy[0]} </h4>
            <br />
            {myGuy[2]}
            <br />
            <h4> {myGuy[1]} </h4>
            <br />
            {myGuy[3]}
            <br />
            <img src='https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fempirewritesback.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F1130338153-850x560.jpeg' height = '150px' />

          </Card.Body>
        </Card>
        <br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br />
        <Card className="modelCard">
          <Card.Body>
            <Card.Header> <h2> Next Game Prediction  </h2></Card.Header>
              <br /> {final_say[0]}
              <br /> {final_say[1]}
          </Card.Body>
        </Card>

        <Card className = "Card3">
           <Card.Body>
            <Card.Title> <h2> Point Leaders </h2> </Card.Title>
             <Card.Text>
              1. Joel Embiid: 33.1 PPG <br />
              2. Luka Doncic: 32.4 PPG <br />
              3. Damian Lillard: 32.2 PPG <br />
              4. Shai Gilgeous-Alexander: 31.4 PPG <br />
              5. Giannis Antetokounmpo: 31.1 PPG <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card4">
           <Card.Body>
            <Card.Title> <h2> Rebound Leaders </h2></Card.Title>
             <Card.Text>
              1. Domantas Sabonis: 12.3 RPG <br />
              2. Giannis Antetokounmpo: 11.8 RPG <br />
              3. Nikola Jokic: 11.8 RPG <br />
              4. Rudy Gobert: 11.6 RPG <br />
              5. Clint Capela: 11.0 RPG <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card5">
           <Card.Body>
            <Card.Title> <h2> Assist Leaders </h2></Card.Title>
             <Card.Text>
              1. James Harden: 10.7 APG <br />
              2. Trae Young: 10.2 APG <br />
              3. Nikola Jokic: 9.8 APG <br />
              4. Chris Paul: 8.9 APG <br />
              5. Ja Morant: 8.1 APG<br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card6">
           <Card.Body>
            <Card.Title> <h2> Turnover Leaders </h2></Card.Title>
             <Card.Text>
              1. Trae Young: 4.1 TO <br />
              2. Giannis Antetokounmpo: 3.9 TO <br />
              3. Luka Doncic: 3.6 TO <br />
              4. Nikola Jokic: 3.6 TO <br />
              5. Russell Westbrook: 3.5 TO <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <br />

         <Card className = "Card3">
           <Card.Body>
            <Card.Title> <h2> Steal Leaders </h2></Card.Title>
             <Card.Text>
              1. OG Anunoby: 1.9 SPG <br />
              2. Fred VanVleet: 1.8 SPG <br />
              3. Jimmy Butler: 1.8 SPG <br />
              4. Anthony Edwards: 1.6 SPG <br />
              5. Shai Gilgeous-Alexander: 1.6 SPG <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card4">
           <Card.Body>
            <Card.Title> <h2> Block Leaders </h2></Card.Title>
             <Card.Text>
              1. Jaren Jackson Jr.: 3.0 BPG <br />
              2. Brook Lopex: 2.5 BPG <br />
              3. Nic Claxton: 2.5 BPG <br />
              4. Myles Turner: 2.3 BPG <br />
              5. Walker Kessler: 2.3 BPG <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card5">
           <Card.Body>
            <Card.Title> <h2> FG% Leaders </h2></Card.Title>
             <Card.Text>
              1. Nic Claxton: 70.5% <br />
              2. Mason Plumlee: 68.0% <br />
              3. Rudy Gobert: 65.9% <br />
              4. Clint Capela: 65.3% <br />
              5. Jarrett Allen: 64.4% <br />
              </Card.Text>
           </Card.Body> 
         </Card>

         <Card className = "Card6">
           <Card.Body>
            <Card.Title> <h2> 3P% Leaders </h2></Card.Title>
             <Card.Text>
              1. Luke Kennard: 49.4% <br />
              2. Al Horford: 44.6% <br />
              3. Damion Lee: 44.5% <br />
              4. Malcolm Brogdon: 44.4% <br />
              5. Tyrese Maxey: 43.4% <br />
              </Card.Text>
           </Card.Body> 
         </Card>


    </body>


    
    
  );

  


}
}

export default App;
