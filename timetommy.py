import db


# Needs to return a time
def calculate_time(content, user_id):
    return 666



def save_metrics(content, user_id, actual_time):
    # I think you will be calling this interanall
    calculated = calculate_time(content, user_id)

    # Save anything else you want here this is what you will be getting 
    to_save = {'calculated': calculated, 'actual': actual_time}
    db.add_info(user_id, to_save)
    return "done"