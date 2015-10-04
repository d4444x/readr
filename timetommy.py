import db
import ReadSpeed

# Needs to return a time
def calculate_time(content, user_id):
    X = []
    y = []
    user_info=db.lookup_user(user_id)
    if(len(user_info) != 0):
        #test row to get the order of the colums
        test_row=user_info[0]
        col_names = []
        for col_name in test_row:
            col_names.append(col_name)

        #Grabs the user info
        for row in user_info:
            y_i=[row['actual']]
            x_i=[]
            for k in row:
                if((k != 'actual') & (k != 'calculated')):
                    x_i.append(row[k])
            X.append(x_i)
            y.append(y_i)
        return ReadSpeed.getReadTime(X,y,content,col_names)
    else:
	db.add_read(user_id)
        return ReadSpeed.getReadTimeNewUser(content)



def save_metrics(content, user_id, actual_time):
    # I think you will be calling this interanall
    calculated = calculate_time(content, user_id)
    metrics = ReadSpeed.text_analytics(content)
    names = ['lexicon','sent','syll','flesch','smog','fog','dale','ari','cl',
             'flesch1','flesch2','flesch3',
             'smog1','smog2','smog3',
             'fog1','fog2','fog3',
             'dale1','dale2','dale3',
             'ari1','ari2','ari3',
             'cl1','cl2','cl3']
    to_save = {}
    for metric,name in zip(metrics,names):
        to_save[name]=metric

    # Save anything else you want here this is what you will be getting 
    to_save['calculated'] = calculated
    to_save['actual'] = actual_time
    db.add_info(user_id, to_save)
    return "done"

