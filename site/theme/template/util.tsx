export function getMenuItems(moduleData, categoryOrder, typeOrder) {
  const menuMeta = moduleData.map((item) => item.meta)
  const menuItems = []
  const sortFn = (a, b) => (a.order || 0) - (b.order || 0)
  menuMeta.sort(sortFn).forEach(meta => {
    if (!meta.category) {
      menuItems.push(meta)
    } else {
      const group = {
        type: 'category',
        title: meta.category,
        children: [],
        order: categoryOrder[meta.category]
      }
      if (meta.type) {
        const type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type]
        }
        group.children.push(type)
        type.children.push(meta)
      }
      menuItems.push(group)
    }
  })
  return menuItems
    .map(i => {
      if (i.children) {
        i.children = i.children.sort(sortFn)
      }
      return i
    })
    .sort(sortFn)
}
