import { Link } from 'react-router-dom';
import Business from './Business';
import User from './User';
import mocks from './mocks.js';


function Home(props) {



    return (
        <div className='split-screen'>
            <User keys={props.keys} setKeys={props.setKeys} />
            <div className='business-container'>
                {
                    mocks.map(data => {
                        return <Business name={data.name} code={data.code} setKeys={props.setKeys}/>
                    })
                }
            </div>
            
        </div>
    )
}

export default Home;
