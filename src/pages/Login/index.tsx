import React,{useCallback} from 'react'
import './index.scss'
import { Form, Button, Input,message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {users} from 'api/user'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = async (values:any) => {
    const data = await users({
      username:values.username,
      password:values.password,
      roleState:true,
      _expand:'role'
    })
    console.log(data,'res');
    
    if(data.length===0){
        message.error("用户名或密码不匹配")
    }else{
        navigate('/home')
        localStorage.setItem("token",JSON.stringify(data[0]))
    }
  }

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container);
  }, []);

  return (
    <div style={{background:'rgb(35, 39, 65)', height: "100%", overflow:"hidden"}}>
       <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                  color: {
                    value: "rgb(35, 39, 65)",
                  },
                  position:"50% 50%",
                  repeat:"no-repeat",
                  size:"cover"
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 400,
                            duration: 2,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
      <div className="formContainer">
        <div className="logintitle">全球新闻发布管理系统</div>
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
              </Button>
            </Form.Item>
        </Form>
      </div>
    </div>
  )
}