import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';
import { useEffect, useState, useRef, use } from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import GroupSettings from './Components/Group_settings';
import Confirm from './Components/Confirm';
import Invite from './Components/Invite';
import { Get } from '../Components/Fetch/post'
import { APIs } from '../Props/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import { Post } from '../Components/Fetch/post';
import { useLogContext } from '../Components/Log/LogContext';







const chatSettings: ChatOptions = { Option: ["invite", "block", "view"], desc: ["invite for a game", "Block user", "View profile"] };
const groupSettings: ChatOptions = {
	Option: ["leave", "see", "settings"],
	desc: ["Leave Group", "See Members", "Group Settings"]
};


export default function Cnvs({ User , OptionHandler}: { User: any, OptionHandler: any}) {

	const [refresher, setRefresher] = useState(false);
	const scroll = useRef(null) as any;
	const [chat, setChat] = useState({} as any);
	const router = useRouter();
	const msgImg = useRef(null) as any;
	const [input, setInput] = useState("");
	const [option, setOption] = useState(false);
	const admin = true;
	const group = true;
	// const [group, setGroup] = useState(false);
	const content: ChatOptions = (group ? (admin ? groupSettings : { Option: ["leave","see"], desc: ["Leave Group","See Members"] }) : chatSettings);
	
	async function getChat(chat: any) {
		let name = "";
		if (chat?.username != undefined){
			name = chat?.username;
			// setGroup(false);
		}
		else{
			name = chat?.name;
			// setGroup(true);
		}
			const data = await Get(APIs.getChat + name);
		setChat(data);
		
	}

	useEffect(() => {
		if (Object.keys(User).length != 0)
			getChat(User);
	}, [User, refresher])

	function Explore(user: any) {

	}
	//hooks for chat settings

	const visible = useRef(null) as any;


	async function send() {
		if (input != "") {
			const data = { message: input, username: User.username };
			const res = await Post(data, APIs.sendMsg);
			setInput("");
		}
		// else if (msgImg.current?.files[0]){
		// 	console.log(msgImg.current?.files[0]);
		// 	Messages.push({user: sender, text: msgImg.current?.files[0], time: "12:00"});
		// }
		setRefresher(!refresher);
	}

	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
	}, [chat]);

	function PrintMsg(msgs: any) {

		const msg = msgs?.msgs;
		const message = <>
			<div className={msg?.receiverId != User.username ? "usr_msg" : "my_msg"}>
				<p>{msg?.content}</p>
				<span >{msg?.createdAt}</span>
				<div className='triangle'></div>
			</div>
		</>
		return <div>{message}</div>

	}

	return (
		<>
			<div className="Chat">
				<section className='User'>

					<Image className='g_img' src={User?.photo ? User?.photo : avatar} priority={true} alt="img" width={75} height={75} />
					<h1 onClick={() => { router.push("/users/" + User?.username) }}>{User?.username}</h1>
					<span>{User?.status ? "online" : "offline"}</span>
					<div className="line"></div>
					{User?.status ? <div className="status"></div> : <></>}

					{Object.keys(User).length != 0 && <button ref={visible} onClick={() => { setOption(!option) }} className="Options">
						<div className='point'></div><div className='point'></div><div className='point'></div>
					</button>}
					{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={content}/>}
				</section>
				<div className="Msg" ref={scroll}>
					{chat?.messages?.map((msg: any) => (<PrintMsg key={msg.id} msgs={msg} />))}
				</div>
				<div className="Send" >
					<div className="line"></div>
					<section>
						<input type="text" placeholder="Type a message" value={input} onChange={(e) => { setInput(e.target.value) }} />
						<input ref={msgImg} className='sendImg' type="file" /><FontAwesomeIcon icon={faCamera} className="icon" />
					</section>
					<button onClick={send}><div></div></button>
				</div>
			</div>
			
			
			
			
			
			
		</>

	)
}
