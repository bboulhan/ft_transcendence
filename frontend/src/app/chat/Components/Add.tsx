import '../../assest/chatComponents.css';
import "../../assest/chat.css";
import Image from 'next/image'
import { MouseEvent, useEffect , useState} from 'react';
import avatar from '../../../../public/avatar.png';
import Options from './Options';


interface Options{
	Option : string;
	desc : string;
}


interface Settings{
	SeeProfile : Options;
	SendMsg : Options;
	Invite : Options;
	Kick? : Options;
	Ban? : Options;
	MakeAdmin? : Options;
	RemoveAdmin? : Options;
	Mute? : Options;
}

const SimpleUser : Settings = {SeeProfile : {Option : "SeeProfile", desc : "See Profile"}, SendMsg : {Option : "SendMsg", desc : "Send Direct Message"}, Invite : {Option : "Invite", desc : "Invite to Game"}};
const Admin : Settings = {SeeProfile : {Option : "SeeProfile", desc : "See Profile"}, SendMsg : {Option : "SendMsg", desc : "Send Direct Message"}, Invite : {Option : "Invite", desc : "Invite to Game"}, Kick : {Option : "Kick", desc : "Kick from Group"}, Ban : {Option : "Ban", desc : "Ban from Group"},  Mute : {Option : "Mute", desc : "Mute"}};
const Owner : Settings = {SeeProfile : {Option : "SeeProfile", desc : "See Profile"}, SendMsg : {Option : "SendMsg", desc : "Send Direct Message"}, Invite : {Option : "Invite", desc : "Invite to Game"}, Kick : {Option : "Kick", desc : "Kick from Group"}, Ban : {Option : "Ban", desc : "Ban from Group"}, MakeAdmin : {Option : "MakeAdmin", desc : "Make Admin"}, RemoveAdmin : {Option : "RemoveAdmin", desc : "Remove Admin"}, Mute : {Option : "Mute", desc : "Mute"}};



export default function Add({Users , Make, title, join, close, role} : {Users: any, Make: any, title: string, join : string, close: any, role : any}){

	
	const [option, setOption] = useState(false);
	let Style: any = {};

	if (join == "JOIN")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)" ,
	};
	else if (join == "Group")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)"};
	else if (join == "StartChat")
		Style = {"backgroundColor": "#1A66FF"};
	// else
	// 	Style = {"backgroundColor": "rgba(255, 51, 102, 1)"};

	function MakeEvent(e: MouseEvent, user : any){
		e.preventDefault();
		Make(user);
		if (join == "StartChat")
			close(false);
	}

	function Print(users : any){
		const user = users?.users;
		const print = <>
			<div className={join == "Group" ? "Settings" : "user"}>
				<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
				{<h3>{join == "Group" ? user?.title : user?.username}</h3>}
				{join == "Group" ? 
					<button onClick={()=>{setOption(!option)}}>Options</button>
					:	<button style={Style} onClick={(e: MouseEvent)=>MakeEvent(e, user)}>{join}</button>
				}
			</div>
		</>
		return <div>{print}</div>
	}
	

	return (
		<>
			<div className="Add">
				<h1>{title}</h1>
				<input type="text" className='searchInput' placeholder="Search"/>
				<button onClick={()=>close(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{Users?.map((user : any, index : number)=>(<Print key={index} users={user}/>))}
				</div>	
				{/* {option && <Options visible={setOption} option={option} btnRef={null} setOptions={null} content={role == "SimpleUser" ? SimpleUser : role == "Admin" ? Admin : Owner}/>} */}
			</div>
		</>
	)
}	