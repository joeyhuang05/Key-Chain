import MyContext from './App.jsx';


function User(props) {

   
   

    return (
        <div className="user">
            <h1>User</h1>
            <h3>STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6</h3>
            <h3>Store Principles</h3>
            <div className="keys" style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                {
                    props.keys.map(data => {
                        return <span>{data.code}</span>
                    })
                }
                <button onClick={(() => props.setKeys([]))}>Reset Keys</button>
            </div>
        </div>
    )
}

export default User;