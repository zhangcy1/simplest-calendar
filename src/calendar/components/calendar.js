import React from 'react'
import './calendar.less'

// 每月
const Month = props => {
  const { currentMouth, handleSelectDay, today, selectedDay, prevMonth, nextMonth } = props

  const startDay = new Date(currentMouth)
  const currentDay = new Date(currentMouth)

  let days = []
  // 获取这个月的每天 0 时 0 分 0 秒
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1)
  }
  // 判断每个月初是否是周一，否则补齐
  days = new Array(startDay.getDay() ? startDay.getDay() : 0).fill(null).concat(days)

  // 判断每个月末是否是周末，否则补齐
  const lastDay = new Date(days[days.length - 1])
  days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 6).fill(null))

  // 以周围单位分组
  let weeks = []
  for (let i = 0; i < days.length / 7; i++) {
    const week = days.slice(i * 7, (i + 1) * 7)
    weeks.push(week)
  }

  return (
    <div className='month-wrapper'>
      <div className='month-header'>
        <span className='month-text'>
          <span
            className='left-btn'
            onClick={() => {
              prevMonth()
            }}
          >
            <em className='icon' />
          </span>
          {startDay.getFullYear()}年
          {String(startDay.getMonth() + 1).length === 1
            ? '0' + (startDay.getMonth() + 1)
            : startDay.getMonth() + 1}
          月
          <span
            className='right-btn'
            onClick={() => {
              nextMonth()
            }}
          >
            <em className='icon' />
          </span>
        </span>
      </div>
      <table className='date-table'>
        <tbody>
          <tr className='date-table-weeks'>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
          {weeks.map((item, index) => {
            return (
              <Week
                key={index}
                days={item}
                handleSelectDay={handleSelectDay}
                today={today}
                selectedDay={selectedDay}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// 每周
const Week = props => {
  const { days, handleSelectDay, today, selectedDay } = props
  return (
    <tr className='weeks'>
      {days.map((day, index) => {
        return (
          <Day
            key={index}
            day={day}
            handleSelectDay={handleSelectDay}
            today={today}
            selectedDay={selectedDay}
          />
        )
      })}
    </tr>
  )
}
// 每天
const Day = props => {
  const { day, handleSelectDay, today, selectedDay } = props
  const classFun = () => {
    if (day < today) return 'week disable'
    if (day === today && today === selectedDay) return 'week selected'
    if (day === today) return 'week today'
    if (day === selectedDay) return 'week selected'
    return 'week'
  }
  return (
    <td
      className={classFun()}
      onClick={() => {
        if (day < today) {
          return false
        }
        handleSelectDay(day)
      }}
    >
      {day ? new Date(day).getDate() : ''}
    </td>
  )
}

const Calendar = props => {
  const { currentMouth, today, handleSelectDay, selectedDay, prevMonth, nextMonth } = props

  return (
    <div className='date-calendar'>
      <Month
        currentMouth={currentMouth}
        handleSelectDay={handleSelectDay}
        today={today}
        selectedDay={selectedDay}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
    </div>
  )
}

export default Calendar
