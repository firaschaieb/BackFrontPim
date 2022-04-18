import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class Track extends StatefulWidget {
  const Track({Key? key}) : super(key: key);

  @override
  _TrackState createState() => _TrackState();
}

class _TrackState extends State<Track> {
  late String? _nom;
  late String? _instrument;
  late String? _key;
  late String? _measure;
  late String? _tempo;
  late String? _MusicTr;
  String id = "";
  String _id = "";
  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();
  final String _baseUrl = "10.0.2.2:3000";
  @override
  void initState() {
    super.initState();
    getid();
    gettoken();
  }
  void gettoken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState((){
      _id = prefs.getString("key")!;
    });
  }
  void getid() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState((){
      id = prefs.getString("_id")!;

    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(


      body: Form(
        key: _keyForm,
        child: ListView(
          children: [
            Container(
                width: double.infinity,
                margin: const EdgeInsets.fromLTRB(20, 0, 20, 10),
                child: Image.asset("assets/images/newtrack.png", width: 460)
            ),
            Container(
                width: double.infinity,
                margin: const EdgeInsets.fromLTRB(20, 0, 20, 10),
                child: Image.asset("assets/images/track.png", width: 460)
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "Name Of Track"),
                onSaved: (String? value) {
                  _nom = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "instrument"),
                onSaved: (String? value) {
                  _instrument = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "key"),
                onSaved: (String? value) {
                  _key = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "measure"),
                onSaved: (String? value) {
                  _measure = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "tempo"),
                onSaved: (String? value) {
                  _tempo = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: TextFormField(
                decoration:  InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                    ), labelText: "MusicTr"),
                onSaved: (String? value) {
                  _MusicTr = value;
                },
                validator: (String? value) {
                  if(value == null || value.isEmpty) {
                    return "Field must not be empty";
                  }
                  else {
                    return null;
                  }
                },
              ),
            ),
            Column(

            children: [
              Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                const SizedBox(
                  width: 10,
                ),
                Container(
                  margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                  child:IconButton (
                    icon: Icon(Icons.attach_file_outlined),
                    iconSize: 60,
                    color: Colors.deepOrange,
                    onPressed: () {

                    },
                  ),
                ),
                const SizedBox(
                  width: 10,
                ),
                Container(
                  margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                  child:IconButton (
                    icon: Icon(Icons.mic_none),
                    iconSize: 60,
                    color: Colors.blueGrey,
                    onPressed: () {

                    },
                  ),
                ),
              ],
            ),
              const SizedBox(
                height: 10,
              ),
              ElevatedButton(
                               style: ElevatedButton.styleFrom(
              shape: new RoundedRectangleBorder(
              borderRadius: new BorderRadius.circular(15.0),
      ),
        padding: EdgeInsets.all(14),
        primary: Colors.white70  ,
        side: BorderSide(width: 3.0, color: Colors.deepOrange,)
      // background
    ),


    child: const Text("Enregistrer" , style: TextStyle(fontWeight: FontWeight.bold , color: Colors.deepOrange)),
                onPressed: () {
                  if(_keyForm.currentState!.validate()) {
                    _keyForm.currentState!.save();

                    Map<String, dynamic> userData = {
                      // "profilePicture": _username,
                      "Nom" : _nom,
                      "instrument" : _instrument,
                      "key" : _key,
                      "measure" : _measure,
                      "tempo" : _tempo,
                      "MusicTr" : _MusicTr,
                      "user" : _id,
                      "musicProject" : id

                    };

                    Map<String, String> headers = {
                      "Content-Type": "application/json; charset=UTF-8"
                    };
                    print(_id);
                    print(id);
                    http.post(Uri.http(_baseUrl, "/api/track/"), headers: headers, body: json.encode(userData))
                        .then((http.Response response) {
                      if(response.statusCode == 201) {
                        print(_id);
                        print(id);

                        //Navigator.pushReplacementNamed(context, "/");
                      }
                      else {
                        showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return const AlertDialog(
                                title: Text("Information"),
                                content: Text("Une erreur s'est produite. Veuillez réessayer !"),
                              );
                            });
                      }
                    });
                  }
                },
              ),
          ]
            )
          ],
        ),
      ),

    );
  }
}

