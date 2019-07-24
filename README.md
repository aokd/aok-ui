<p align="center">

```bash 
                                     ___       __   __  ______
                                    / _ |___  / /__/ / / /  _/
                                   / __ / _ \/  '_/ /_/ // /  
                                  /_/ |_\___/_/\_\\____/___/  
```

</p>
<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/aokd/aok-ui.svg?branch=develop)](https://travis-ci.org/aokd/aok-ui)
[![codecov](https://codecov.io/gh/aokd/aok-ui/branch/develop/graph/badge.svg)](https://codecov.io/gh/aokd/aok-ui)

</div>

### 1. What's this?
a group of react components.

### 2. Tools
- front-matter: YAML is extracted from the top of a file between matching separators of '---' or '= yaml ='.
- babel: transform sample code in md to js.
- jest && enzyme: test && JavaScript Testing Utility for React

### 3. Standard
- stylelint order
```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typography */
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
}
```

### 4. Todos
- [x] parse markdown demos
- [ ] basic components
- [ ] high order components
- [ ] business components
- [ ] continuous integration