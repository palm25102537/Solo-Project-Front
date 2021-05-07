import React from 'react'
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
function Head() {

  const history = useHistory()
  return (
    <div className="App-header">
      <div className="App-header-text">
        <img onClick={() => history.push('/')} style={{ marginLeft: '5px', width: '55px', height: '55px', borderRadius: '28px' }} src="https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/103081654_101496514943895_4902528536357904749_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeGNpkC5KGIHv0og7xMup5EepjIsVzKV7pGmMixXMpXukfFAvvxMzAMoIE3eJJneDXU&_nc_ohc=79GJ9GhrGfsAX95rQ5Q&_nc_ht=scontent.fbkk22-2.fna&oh=027a9a887cf139fce7c26762f1b97ff8&oe=60A7C75A" alt="Logo"></img>
        <h3 style={{
          marginLeft: '11.5px',
          marginTop: '6px',
          color: 'white'
        }}>SnickSnack</h3>
      </div>

      <div className="App-header-search">
        <input className="App-search-bar" />
        <Button type="solid" shape="circle" icon={<SearchOutlined />} style={{ marginRight: '10px', backgroundColor: '#fdbb75', color: 'white' }} />
      </div>

    </div>
  )
}

export default Head
