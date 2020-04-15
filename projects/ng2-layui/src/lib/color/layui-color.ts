
export class LayuiColor {
  static COLOR_GREEN = {label:'green',value:'#009688'}
  static COLOR_CLING = {label:'cling',value:'#5FB878'}
  static COLOR_CYAN = {label:'cyan',value:'#2F4056'}
  static COLOR_BLACK = {label:'black',value:'#393D49'}
  static COLOR_BLUE = {label:'blue',value:'#1E9FFF'}
  static COLOR_YELLOW = {label:'yellow',value:'#FFB800'}
  static COLOR_ORANGE = {label:'orange',value:'#FF5722'}
  static COLOR_WATHET = {label:'wathet',value:'#01AAED'}
  static COLOR_GREY = [
    {label:'grey',value:'#eeeeee'},
    {label:'grey-0',value:'#F0F0F0'},
    {label:'grey-1',value:'#f2f2f2'},
    {label:'grey-2',value:'#eeeeee'},
    {label:'grey-3',value:'#e2e2e2'},
    {label:'grey-4',value:'#dddddd'},
    {label:'grey-5',value:'#d2d2d2'},
    {label:'grey-6',value:'#c2c2c2'}
  ]
  static COLOR_LIST = [
    LayuiColor.COLOR_GREEN,
    LayuiColor.COLOR_CLING,
    LayuiColor.COLOR_CYAN,
    LayuiColor.COLOR_BLACK,
    LayuiColor.COLOR_BLUE,
    LayuiColor.COLOR_YELLOW,
    LayuiColor.COLOR_ORANGE,
    LayuiColor.COLOR_WATHET,
  ].concat(LayuiColor.COLOR_GREY)

  getColorValue(label){
    let colors = LayuiColor.COLOR_LIST.filter(c=>c.label == label)
    return colors.length>0?colors[0].value:'black'
  }
}
