const entries = document.querySelector('div#entries');
const reset = document.querySelector('div#entries').innerHTML;
function selectProjects() {
return document.querySelectorAll('div.project-entry');
}
const projects = selectProjects();
let filtered = [...projects];
let filters = new Set();
function mapProjectTags() {
const projectTags = {};
document.querySelectorAll('div.project-entry')
.forEach(function(project) {
    const tagSpans = project.lastElementChild.children;
    const tags = [];
    for (let i = 0; i < tagSpans.length; i++) {
    tags.push(tagSpans[i].innerHTML);
    }
    projectTags[project.id] = tags;
});
return projectTags;
}
const projectTags = mapProjectTags();
function attachTagEvents() {
document.querySelectorAll('span.tag')
.forEach(function(tag) {
    tag.addEventListener('click', setFilter);
});
}
function resetEntries() {
entries.innerHTML = reset;
attachTagEvents();
filters.clear();
filtered = [...document.querySelectorAll('div.project-entry')];
}
function setFilter(event) {
const filter = event.target.innerText;
const projectId = event.target.parentNode.parentNode.id;
if (filters.has(filter)) {
    resetEntries();
    return;
}
filters.add(filter);
let newHTML = '';
selectProjects().forEach(function(prj) {
    const hasTags = [...filters].reduce(function(prev, curr, i) {
    return prev && projectTags[prj.id].includes(curr);
    }, true);
    if (hasTags) {
    newHTML += prj.outerHTML;
    }
});
entries.innerHTML = newHTML;
attachTagEvents();
};
attachTagEvents();