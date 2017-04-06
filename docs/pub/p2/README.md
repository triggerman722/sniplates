# Case Management Sidebar

A very similar template to [Case Management Reimagined](https://triggerman722.github.io/sniplates/pub/p1/demonstration/index.html#/dashboard), however, this template it a full width administration template with a sidebar.

![Case Management Sidebar](screen.png?raw=true "Case Management Sidebar")

## Features
* [Google Maps Integration](#google)
* [Its an AngularJS App](#angularjs)
* [Searching](#searching)
* [Document Viewing](#document)


### <a name="google"></a>Google Maps Integration

In this template, a Google map of Alabama is shown with counties highlighted representing areas of concentration of (ficticious) legal cases. One of the things I really wanted to include was to show a custom tooltip when you hovered over a county. It turns out this is really tricky, and I had to use a [custom mapfile](https://github.com/triggerman722/sniplates/tree/master/docs/pub/p2/demonstration/data/maps) to make it happen. However, in the end, the result is as I wanted it. 

### <a name="angularjs"></a> Its an AngularJS App

All data shown is pulled from the server. What this means is that if you actually wanted to integrate this template into a production environment, you would only need to:
* Add a new JSON file for the individual data item. For example, you could add "6.json" to the data/cases folder.
* Add the same data to the main file. So following the above example, you would need to edit data/cases/cases.json and add the content of 6.json to the cases.json file.
* This same idea applies to all data types - cases, clients, documents and dashboard (although the template only ever displays a single dashboard).
* If you are adding a document, you would also need to add the actual document file to data/docs folder.

### <a name="searching"></a> Searching

On all "list screens", such as when you click on [Clients](https://triggerman722.github.io/sniplates/pub/p4/demonstration/index.html#/clients), [Cases](https://triggerman722.github.io/sniplates/pub/p4/demonstration/index.html#/cases), or [Documents](https://triggerman722.github.io/sniplates/pub/p4/demonstration/index.html#/documents), there is a textbox on the top right side of the page that accepts a search query. As you type in that field, the results will be filtered to display only results that match your query. This is a cool feature you basically get for free with AngularJS.

### <a name="document"></a> Document Viewing

When you client on [Documents](https://triggerman722.github.io/sniplates/pub/p4/demonstration/index.html#/documents) to view the list of documents, and then click on an individual document, I felt it was very important the document be rendered within the browser. The basic assumption is that most of the documents will be PDF format. It turns out to be pretty simple, but in development it was one of those rabiit hole things where I spent a lot of time looking for the answer. As nice as it is on modern browsers like Chrome, there will still likely be problem with odd/old browsers and files that do not have native rendering support.

## Next Steps

Well, that's up to you. [Fork](https://github.com/triggerman722/sniplates/fork), [Clone](https://github.com/triggerman722/sniplates), or [Download](https://github.com/triggerman722/sniplates/archive/master.zip) (as a zip file). The project is open source.
