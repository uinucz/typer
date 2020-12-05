import React, { useState, useEffect, useRef } from 'react'
import { v1 as uuid } from 'uuid'
import axios from 'axios'
import Main from './components/Main'
import Button from './components/Button'
import Stats from './components/Stats'
import List from './components/List'

const ruData = [
  '125-летняя война токов завершилась на исходе ноября 2007 года окончательным переходом Нью-Йорка с постоянного тока на переменный.',
  'Ранее (а в поездах специального назначения и в наши дни) поезда имели вагон сопровождения, предназначенный для охраны и имевший специальное оборудование, например, тормозное. В США некоторые из этих вагонов имели наблюдательное место, расположенное на втором этаже.',
  'Эдвард Коп стал одним из пионеров изучения динозавров, а его раскопки в южном Нью-Джерси и западных штатах США рассматривают в настоящее время как краеугольный камень палеонтологии динозавров.',
  'Эволюция Земли происходила посредством геологических и биологических процессов, которые оставили следы первоначальных условий. Поверхность планеты разделена на несколько непрерывно движущихся литосферных плит, ЧТО приводит к периодическому слиянию и разъединению континентов.',
  'Механические часы, применяющие штыревой спусковой механизм, были созданы в XIV веке и стали стандартным инструментом для измерения времени вплоть до появления пружинных часовых механизмов и карманных часов в XVI веке. Следом появились маятниковые часы и на протяжении трёх веков они были наиболее точным устройством измерения времени.',
  'Иммигранты первого и второго поколений обычно говорят на японском, в то же время, владея английским. Родным языком последующих поколений обычно является английский, несмотря на то, что многие из них впоследствии учат японский как иностранный. На Гавайях, где японская диаспора составляет значительную долю от общего населения, японский язык более распространён.',
  'Марта встречает существо, но выживает, а из шока её выводит Доктор, к тому моменту догадавшийся, что это существо - фендалин, который был уничтожен после взрыва Пятой планеты. Он проникает в аббатство и находит череп, который пытается его убить. Лила спасает его, и они отправляются на Пятую планету, но обнаруживают, что повелители времени заключили планету во временную петлю, а записи о ней скрыли от всех.',
  'Луций Домиций Агенобарб принадлежал по рождению к древнему плебейскому роду Домициев. Согласно Светонию, предки будущего императора отличались крутым нравом и проявляли в крайней степени свойственные римскому воспитанию добродетели и пороки.',
  'Альпака является частью семейства верблюдовых Южной Америки, включающего в себя также лам, гуанако и викунью. Первоначально альпака ошибочно относили к роду лам, однако в 2001 году систематику вида сменили с Lama pacos на Vicugna pacos, выяснив, что предками альпака были викуньи, а не гуанако, прародители всех домашних лам.',
  'В Гарвардском парке находятся центральные административные здания, основные библиотеки университета, академические здания, большинство общежитий для первокурсников, а также корпуса Сивера и Юниверсити, и мемориальная церковь. Девять из двенадцати жилых "домов" для студентов, начиная со второго курса, расположены к югу от Гарвардского двора и вблизи реки Чарльз.',
  'В 1799 году появляется упоминание о бульдоге среди охотничьих собак, в котором бульдоги и мастифы рекомендуются для охоты на кабанов. Вслед за этим иллюстратор Сиденем Эдвардс в своей "Cynographia Britannica" (1800) даёт очень живописное описание бульдога и сообщает, что собака эта произошла от скрещивания большого мастифа с мопсом.',
  'В то время как боги сферы чувственного связаны с желаниями и переживаниями, асуры, завидуя богам, проявляют гнев, гордость, воинственность и хвастовство, их интересует власть и самовоздвижение.В буддийских сочинениях сначала рассматривали чаще пять миров, чем шесть, а асур помещали в мир богов.',
]
const initialText = 'Type this in.'

const useTimer = () => {
  const [active, setActive] = useState(false)
  const [cur, setCur] = useState(0)

  useEffect(() => {
    let interval
    if (active) {
      interval = setInterval(() => setCur((x) => x + 0.1), 100)
    }
    return () => clearInterval(interval)
  }, [active])

  const stopTimer = () => {
    setActive(false)
  }
  const startTimer = () => {
    setActive(true)
  }

  return {
    cur,
    setCur,
    stopTimer,
    startTimer,
  }
}

const App = () => {
  const { cur, setCur, stopTimer, startTimer } = useTimer()
  const [text, setText] = useState(initialText)
  const [results, setResults] = useState([])
  const [eng, setEng] = useState(() => true)
  const [info, setInfo] = useState('')
  const [j, setJ] = useState(0)
  const renderCount = useRef(0)

  const updateText = () => {
    eng
      ? axios
          .get('https://uselessfacts.jsph.pl/random.json?language=en')
          .then((response) => setText(response.data.text))
      : setText(ruData[Math.floor(Math.random() * ruData.length)])
  }
  const textToArray = (text) => {
    let array = text.split(' ').map((x) => x.concat(' '))
    return array.map((word, i) =>
      i === array.length - 1 ? word.slice(0, word.length - 1) : word
    )
  }
  const getCorrectPart = (input, word) => {
    const a = input.split('')
    const b = word.split('')
    let boo = true
    let c = []
    for (let i = 0; i < a.length && boo; i++)
      if (a[i] !== b[i]) boo = false
      else c.push(a[i])
    return c.join('')
  }

  const list = textToArray(text)
  const left = list.slice(j + 1)
  const read = list.slice(0, j)
  const word = list[j]
  const wordR = getCorrectPart(info, word)
  const fin = list[list.length - 1] === info && j === 0

  const handleInputChange = (x) => {
    setInfo(x)
  }
  const handleReset = () => {
    setInfo('')
    setJ(0)
    setCur(0)
    stopTimer()
  }

  useEffect(() => {
    if (info.length === 1 && j === 0) startTimer()
    if (info === word) {
      if (left.length === 0) {
        stopTimer()
        setResults(
          results.concat({
            speed: Math.round((list.join().length * 60) / cur),
            speedWPM: Math.round((list.join().length * 10) / cur),
            time: Number(cur).toFixed(1),
            info: text,
            id: uuid(),
          })
        )
        setJ(0)
      } else {
        setJ(j + 1)
        setInfo('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])

  useEffect(() => {
    if (renderCount.current) updateText()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eng])

  useEffect(() => {
    renderCount.current++
  })

  return (
    <div className="center-screen " style={{}}>
      <div
        className="ui text container fixed"
        style={{ position: 'absolute', top: '20%' }}
      >
        <div>
          <h1 className="ui center aligned header">Typer</h1>

          <div>
            <Button
              onClickFunction={handleReset}
              text={'Try again'}
              colour={'inverted  blue  '}
            />
            <Button
              onClickFunction={() => {
                handleReset()
                updateText()
              }}
              text={'Next'}
              colour={'inverted violet'}
            />

            <Button
              onClickFunction={() => {
                handleReset()
                setEng(!eng)
              }}
              text={
                !eng ? <i className="uk flag" /> : <i className="ru flag" />
              }
              colour={'inverted purple '}
            />
          </div>

          <div className="ui segment">
            <div className="ui  relaxed two column internally celled  grid">
              <Stats
                text={
                  cur <= 1
                    ? 0
                    : fin
                    ? Math.round((list.join().length * 10) / cur)
                    : Math.round(
                        ((read.join() + info).length * 10) /
                          (Math.round(cur * 4) / 4)
                      )
                }
                label={'wpm'}
                size={'tiny'}
              />
              <Stats
                text={Number(cur).toFixed(1)}
                label={'sec'}
                size={'tiny'}
              />
            </div>
          </div>
        </div>

        <Main
          left={left}
          read={read}
          word={word}
          wordR={wordR}
          incorrectLength={fin ? 0 : info.length - wordR.length}
        />

        {fin ? null : (
          <div className="ui center aligned  container">
            <div className={'ui focus input'}>
              <input
                autoFocus
                value={info}
                onChange={({ target }) => handleInputChange(target.value)}
              />
            </div>
          </div>
        )}

        <List results={[...results].reverse()} />
      </div>
    </div>
  )
}

export default App
