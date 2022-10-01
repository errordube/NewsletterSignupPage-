//Aditya Dube
#include <bits/stdc++.h>
using namespace std;
 void wrong ()
 {

    int A, B;
    cin>> A >> B;
    int result = A - B;
    if (result%10 == 9)
        cout << result - 1 << endl;
    else
        cout << result + 1 << endl;

 }

 int main()
 {
     wrong();
     
 }