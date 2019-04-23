---
order: 0
title: 按钮类型
description: 按钮有四种类型： 主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。
---

```jsx
import { Button } from 'aok'

ReactDOM.render(
  <React.Fragment>
    <Button type='primary'>Primary</Button>
    <Button type='default'>Default</Button>
    <Button type='danger'>Danger</Button>
  </React.Fragment>,
  mountNode
)
```