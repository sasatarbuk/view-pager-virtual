# Changelog

## 0.2.0
- Refactored `ViewPager` and `ViewPagerTemplate` to use a custom hook for shared functionality and a template component
for shared view. Internal props from `ViewPager` are removed and now only `BaseProps` are a part of the public api.
- Added memos so that pages are not re-rendered needlessly
- Added style prop to pager implementations to inject css properties into the page element

## 0.1.1
- Updated npm scripts

## 0.1.0
- Initial release
