select 

jiraissue.pkey || ' - ' || jiraissue.summary,
worklog.author,
sum(timeworked)/60/60,

issuelink.source,
issuelink.destination,
jiraissue.id,
worklog.issueid

from issuelink


inner join worklog on worklog.issueid = issuelink.destination
inner join jiraissue on jiraissue.id = issuelink.destination

where

issuelink.source = 50100 and worklog.updated < '2012-12-31'

group by worklog.issueid, worklog.author, issuelink.source, issuelink.destination, jiraissue.id,
jiraissue.pkey, jiraissue.summary


order by jiraissue.pkey