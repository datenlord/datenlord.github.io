import React from 'react'
import styled from 'styled-components'

import titleUrl from '@/assets/MITRank/title.png'
import stage1Url from '@/assets/MITRank/stage1.png'
import stage2Url from '@/assets/MITRank/stage2.png'
import stage3Url from '@/assets/MITRank/stage3.png'
import githubIconUrl from '@/assets/MITRank/github.svg'

const TopSecCtr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.72rem;
  padding-block: calc(0.72rem + 0.53rem) 0.8rem;
  background: #1a1a1a;
`
const TtlUpper = styled.img`
  padding-top: 0.53rem;
  width: 4.6rem;
`
const Title = styled.div`
  padding-top: 0.41rem;
  color: #fff;
  font-size: 0.44rem;
  line-height: 0.56rem;
`
const SubTtl = styled.div`
  color: #fff;
  font-size: 0.2rem;
  line-height: 0.56rem;
`
const MainWarp = styled.main`
  background: #000;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.46rem;
  max-width: 1440px;
  margin-inline: auto;
  padding: 0.9rem 1.23rem 1.5rem;
`
const StageWarp = styled.div`
  padding: 0.01rem;
  border-radius: 0.16rem;
  background: linear-gradient(90deg, #fff, #000);
`
const Stage = styled.div`
  display: flex;
  border-radius: 0.16rem;
  padding: 0.21rem 0.29rem 0.25rem;
  background: #000;
`
const StageIcon = styled.img`
  display: inline-block;
`
const PeopleWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0.27rem 0.84rem 0.23rem;
  margin-right: 0;
  overflow: hidden;
`
const PeopleCtr = styled.ul`
  display: flex;
  gap: 0.32rem;
  animation: 20s move infinite linear;
  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-7.56rem);
    }
  }
`
const PeopleItem = styled.li`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  width: 0.76rem;
  cursor: pointer;
`
const Avatar = styled.img`
  width: 0.62432rem;
  height: 0.62432rem;
  border-radius: 50%;
`
const Name = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding-top: 0.04rem;
  font-size: 0.14rem;
  line-height: 0.31216rem;

  &::after {
    content: '';
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    background-image: url(${githubIconUrl});
    background-size: cover;
    margin-left: 0.06rem;
  }
`

const stage1 = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/11474381?v=4',
    name: '米明恒',
    url: 'https://github.com/myrfy001',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/32484423?v=4',
    name: '王恒宇',
    url: 'https://github.com/GTwhy',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/78157415?v=4',
    name: '钱嘉程',
    url: 'https://github.com/kazutoiris',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/55951109?v=4',
    name: '翁万正',
    url: 'https://github.com/wengwz',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/111745697?v=4',
    name: '回浩嘉',
    url: 'https://github.com/Huihaojia',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/108394891?v=4',
    name: '李琦彬',
    url: 'https://github.com/androny1012',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/94814217?v=4',
    name: '李金东',
    url: 'https://github.com/adamgallas',
  },
]

const stage2 = stage1
const stage3 = stage2

export default () => {
  return (
    <React.Fragment>
      <TopSecCtr>
        <TtlUpper src={titleUrl} />
        <Title>恭喜所有完成MIT体系结构公开课学习的同学！</Title>
        <SubTtl>（排名不分先后）</SubTtl>
      </TopSecCtr>
      <MainWarp>
        <Main>
          <StageWarp>
            <Stage>
              <StageIcon src={stage1Url} />
              <PeopleWrap>
                <PeopleCtr>
                  {stage1.map(({ avatar, name, url }) => (
                    <PeopleItem key={name} onClick={() => window.open(url)}>
                      <Avatar src={avatar} />
                      <Name>{name}</Name>
                    </PeopleItem>
                  ))}
                  {stage1.map(({ avatar, name, url }) => (
                    <PeopleItem key={name} onClick={() => window.open(url)}>
                      <Avatar src={avatar} />
                      <Name>{name}</Name>
                    </PeopleItem>
                  ))}
                </PeopleCtr>
              </PeopleWrap>
            </Stage>
          </StageWarp>
          <StageWarp>
            <Stage>
              <StageIcon src={stage2Url} />
              <PeopleWrap>
                <PeopleCtr>
                  {stage2.map(item => (
                    <PeopleItem key={item.name}>
                      <Avatar src={item.avatar} />
                      <Name>{item.name}</Name>
                    </PeopleItem>
                  ))}
                  {stage2.map(item => (
                    <PeopleItem key={item.name}>
                      <Avatar src={item.avatar} />
                      <Name>{item.name}</Name>
                    </PeopleItem>
                  ))}
                </PeopleCtr>
              </PeopleWrap>
            </Stage>
          </StageWarp>
          <StageWarp>
            <Stage>
              <StageIcon src={stage3Url} />
              <PeopleWrap>
                <PeopleCtr>
                  {stage3.map(item => (
                    <PeopleItem key={item.name}>
                      <Avatar src={item.avatar} />
                      <Name>{item.name}</Name>
                    </PeopleItem>
                  ))}
                  {stage3.map(item => (
                    <PeopleItem key={item.name}>
                      <Avatar src={item.avatar} />
                      <Name>{item.name}</Name>
                    </PeopleItem>
                  ))}
                </PeopleCtr>
              </PeopleWrap>
            </Stage>
          </StageWarp>
        </Main>
      </MainWarp>
    </React.Fragment>
  )
}
