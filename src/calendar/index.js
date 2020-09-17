import React, { useState, useEffect } from 'react'
import Calendars from './components/calendar'
import { formatDate } from '../util'
import './index.less'

let weekText = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const Calendar = props => {
  const { onChange, title, week, icon, width, height } = props

  const [today, setToday] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState('')

  const [calendarVisible, setCalendarVisible] = useState(false)

  useEffect(() => {
    //  今天
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    setToday(today.getTime())
    setSelectedDay(today.getTime())
    setSelectedWeek(weekText[today.getDay()])
  }, [])

  useEffect(() => {
    // 当前月
    // 获取当前月的 0 时 0 分 0 秒，代表当前月份
    const currentMonth = new Date()
    currentMonth.setHours(0)
    currentMonth.setMinutes(0)
    currentMonth.setSeconds(0)
    currentMonth.setMilliseconds(0)
    // 设置当前月的 1 号
    currentMonth.setDate(1)

    setSelectedMonth(currentMonth.getTime())
  }, [])

  // 选择日期
  const handleSelectDay = param => {
    onChange(param)
    setSelectedDay(param)
    setSelectedWeek(weekText[new Date(param).getDay()])
    setCalendarVisible(false)
  }

  // 上个月
  const prevMonth = () => {
    const month = new Date(selectedMonth)
    month.setMonth(month.getMonth() - 1)
    setSelectedMonth(month)
  }
  // 下个月
  const nextMonth = () => {
    const month = new Date(selectedMonth)
    month.setMonth(month.getMonth() + 1)
    setSelectedMonth(month)
  }

  const handleClick = () => {
    setCalendarVisible(true)
  }

  return (
    <div
      className='calendar-content-wrapper-picker'
      style={{ width: width ? width : '230px', height: height ? height : '37px' }}
    >
      <div
        className='calendar-input-wrapper'
        onClick={() => {
          handleClick()
        }}
        style={{ width: width ? width : '230px', height: height ? height : '37px' }}
      >
        {title && <div className='calendar-input-title'>{title}</div>}
        <input
          className='calendar-input-input'
          type='text'
          value={formatDate(selectedDay, '-')}
          readOnly
        />
        {week === false ? null : <div className='calendar-input-week'>{selectedWeek}</div>}
        {icon === false ? null : <div className='calendar-input-icon' />}
      </div>
      {calendarVisible && (
        <div className='calendar-container'>
          <Calendars
            today={today}
            currentMouth={selectedMonth}
            selectedDay={selectedDay}
            handleSelectDay={handleSelectDay}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
        </div>
      )}
    </div>
  )
}

export default Calendar
